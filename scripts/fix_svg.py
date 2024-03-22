import argparse
import subprocess
import xml.etree.ElementTree as ET
import os
from collections import defaultdict

# See https://www.notion.so/codehs/Scratch-ScratchJr-fae5d776041d479c914dc8fddc80517b?pvs=4#b54bef0321664e03b73c9d3e58b5808f

# Get the directory containing the current script
script_dir = os.path.dirname(os.path.abspath(__file__))
# Construct the path to the Node.js script
node_script_path = os.path.join(script_dir, 'transform-svg.js')

def clean_command_string(command_string, scale_x=None, scale_y=None):
    # Run the Node.js script and capture stdout and stderr
    node_command = ['node', node_script_path, command_string]
    if scale_x is not None:
        node_command.append(str(scale_x))
    if scale_y is not None:
        node_command.append(str(scale_y))
    try:
        result = subprocess.run(
            node_command,
            capture_output=True,
            text=True,
            check=True
        )
    except subprocess.CalledProcessError as e:
        print(e.output)
        print(e.stderr)
        raise

    # Check the return code (0 means success)
    if result.returncode == 0:
        # Clean script succeeded
        return result.stdout

    else:
        # Clean script failed
        raise Exception(f'Clean script failed with error:\n{result.stderr}')


def scale_circles(root, scale):
    if scale is None:
        return
    
    for circle in root.iter('{http://www.w3.org/2000/svg}circle'):
        if 'cx' in circle.attrib:
            cx = float(circle.attrib['cx'])
            circle.attrib['cx'] = str(cx * scale)

        if 'cy' in circle.attrib:
            cy = float(circle.attrib['cy'])
            circle.attrib['cy'] = str(cy * scale)

        if 'r' in circle.attrib:
            r = float(circle.attrib['r'])
            circle.attrib['r'] = str(r * scale)

def add_size(root):
    # Get the width and height of the SVG from the viewBox attribute
    view_box = root.attrib['viewBox']
    view_box_values = view_box.split(' ')
    width = view_box_values[2]
    height = view_box_values[3]

    # Add the width and height as attributes to the root <svg> element
    root.attrib['width'] = width
    root.attrib['height'] = height

def inline_styles(root):
    # Check if <defs> exists
    defs_tag = root.find('.//{http://www.w3.org/2000/svg}defs')
    if defs_tag is None:
        print('No <defs> tag found in the SVG file.')
        return

    # Create a dictionary to store CSS properties
    css_properties = defaultdict(list)

    # Find and process the <style> tag within <defs>
    style_tag = defs_tag.find('{http://www.w3.org/2000/svg}style')
    if style_tag is not None:
        css_text = style_tag.text.strip()  # Get the CSS text inside the <style> tag

        # Split the CSS text into individual rules
        css_rules = css_text.split('}')
        for rule in css_rules:
            rule = rule.strip()
            if not rule:
                continue

            # Split each rule into selector and properties
            selectors, properties = rule.split('{', 1)
            selectors = [s.strip() for s in selectors.split(',')]
            properties = properties.strip()

            # Store the CSS properties in the dictionary
            for property in properties.split(';'):
                property = property.strip()
                if property:
                    for selector in selectors:
                        css_properties[selector].append(property)

        # Remove the <defs> and <style> tags
        defs_tag.remove(style_tag)
        root.remove(defs_tag)

    # Apply CSS properties to matching elements throughout the document
    for element in root.iter():
        if 'class' in element.attrib:
            selectors = [f'.{s.strip()}' for s in element.attrib['class'].strip().split(' ')]
            for selector in selectors:
                if selector in css_properties:
                    properties = css_properties[selector]
                    for prop in properties:
                        prop = prop.strip()
                        if prop:
                            prop_name, prop_value = prop.split(':', 1)
                            element.set(prop_name.strip(), prop_value.strip())
    
           # Delete the 'class' attribute from the element
            del element.attrib['class']


def fix_svg_file(input_file, output_file, scale=None):
    # Parse the SVG file
    print("Starting to parse file " + input_file)
    tree = ET.parse(input_file)
    root = tree.getroot()

    inline_styles(root)
    add_size(root)
    # Iterate through all <path> elements
    total_paths = len(list(root.iter('{http://www.w3.org/2000/svg}path')))
    i = 0
    for path in root.iter('{http://www.w3.org/2000/svg}path'):
        if i % 100 == 0:
            print(f'{i}/{total_paths} processed')
        i += 1
        if 'd' in path.attrib:
            # Get the command string value
            command_string = path.attrib['d']

            # Clean the command string
            cleaned_command_string = clean_command_string(command_string, scale, scale)

            # Update the 'd' attribute with the cleaned value
            path.set('d', cleaned_command_string)
    
    # Scale all circles
    scale_circles(root, scale)

    # Add necessary XML namespaces and attributes to the root <svg> element
    root.attrib['xmlns'] = 'http://www.w3.org/2000/svg'
    root.attrib['xmlns:xlink'] = 'http://www.w3.org/1999/xlink'
    root.attrib['version'] = '1.1'

    # Remove the namespace prefixes
    for elem in root.iter():
        if '}' in elem.tag:
            elem.tag = elem.tag.split('}', 1)[1]

    # Save the modified SVG
    tree.write(output_file, encoding='utf-8', xml_declaration=True)
    print(f'Saved the modified SVG to {output_file}')

def fix_svg_files(input_dir, output_dir, scale=None):
    input_files = os.listdir(input_dir)
    input_files = [f for f in input_files if f.endswith('.svg')]
    for input_file in input_files:
        # Generate output file path
        input_file_path = os.path.join(input_dir, input_file)
        output_file = os.path.join(output_dir, os.path.basename(input_file))
        fix_svg_file(input_file_path, output_file, scale)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Fix SVG files by inlining styles and re-formatting path strings.')
    parser.add_argument('input_dir', help='Directory containing the input SVG files.')
    parser.add_argument('--output', default='.', help='Directory to save the output SVG files (default: current directory).')
    parser.add_argument('--scale', type=float, default=1.0, help='How much to scale the SVG elements by (default: 1.0).')

    args = parser.parse_args()
    input_svg_paths = args.input_dir
    output_dir = args.output
    scale = args.scale

    fix_svg_files(input_svg_paths, output_dir, scale)

