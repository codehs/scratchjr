import argparse
import xml.etree.ElementTree as ET
from collections import defaultdict

def apply_css_to_svg(input_file, output_file):
    # Parse the SVG file
    tree = ET.parse(input_file)
    root = tree.getroot()

    # Check if <defs> exists
    defs_tag = root.find('.//{http://www.w3.org/2000/svg}defs')
    if defs_tag is None:
        raise RuntimeError('No <defs> tag found in the SVG file.')
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

        # Remove the <style> tag
        defs_tag.remove(style_tag)

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

    # Delete the <defs> tag
    root.remove(defs_tag)

    # Delete the 'class' attribute from all elements
    for element in root.iter():
        if 'class' in element.attrib:
            del element.attrib['class']

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

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Extract CSS styles from the defs section of an SVG file and inline them.")
    parser.add_argument("input_file", help="Relative path to the input SVG file.")
    parser.add_argument("--output", help="Relative path to the output SVG file (optional).")

    args = parser.parse_args()
    input_svg_file = args.input_file
    output_svg_file = args.output if args.output else "output.svg"

    apply_css_to_svg(input_svg_file, output_svg_file)

