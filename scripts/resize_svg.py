import argparse
import math
import xml.etree.ElementTree as ET
import os

def change_size(root, scale):
    # Get the width and height of the SVG from the viewBox attribute
    view_box = root.attrib['viewBox']
    view_box_values = view_box.split(' ')
    width = float(view_box_values[2])
    height = float(view_box_values[3])

    # Add the width and height as attributes to the root <svg> element
    root.attrib['width'] = str(math.floor(width*scale))
    root.attrib['height'] = str(math.floor(height*scale))

def resize_svg(input_file, output_file, scale=None):
    try:
        # Parse the SVG file
        ET.register_namespace('',"http://www.w3.org/2000/svg")
        tree = ET.parse(input_file)
        root = tree.getroot()

        # Change the width and height of the SVG
        change_size(root, scale)
        # Save the modified SVG
        tree.write(output_file)
        print(f"SVG resized and saved as {output_file}")

    except Exception as e:
        print(f"Error: {e}")

def resize_svgs(input_dir, output_dir, scale=None):
    input_files = os.listdir(input_dir)
    input_files = [f for f in input_files if f.endswith('.svg')]
    for input_file in input_files:
        # Generate output file path
        input_file_path = os.path.join(input_dir, input_file)
        output_file = os.path.join(output_dir, os.path.basename(input_file))
        resize_svg(input_file_path, output_file, scale)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Resize SVGs.')
    parser.add_argument('input_dir', help='Directory containing the input SVG files.')
    parser.add_argument('--output', default='.', help='Directory to save the output SVG files (default: current directory).')
    parser.add_argument('--scale', type=float, default=1.0, help='How much to scale the SVG elements by (default: 1.0).')

    args = parser.parse_args()
    input_svg_paths = args.input_dir
    output_dir = args.output
    scale = args.scale

    resize_svgs(input_svg_paths, output_dir, scale)