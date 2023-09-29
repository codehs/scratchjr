from resize_png import resize_png

base_path = 'editions/free/src/pnglibrary/'

import os
def swap_file_names(file1, file2):
    try:
        # Check if both files exist
        if os.path.exists(file1) and os.path.exists(file2):
            # Generate temporary file names to avoid conflicts
            temp_file1 = file1 + "_temp"
            temp_file2 = file2 + "_temp"

            # Rename file1 to a temporary name
            os.rename(file1, temp_file1)

            # Rename file2 to file1's original name
            os.rename(file2, file1)

            # Rename file1 (now temp_file1) to file2's original name
            os.rename(temp_file1, file2)

            print(f"Swapped names of {file1} and {file2}")

        else:
            print("Both files must exist to swap their names.")

    except Exception as e:
        print(f"Error: {e}")

io = [
    ('Scout-face-left.png', '_Scout-face-left.png'),
    ('Scout-face-right.png', '_Scout-face-right.png'),
    ('Scout-point-left.png', '_Scout-point-left.png'),
    ('Scout-point-right.png', '_Scout-point-right.png'),
    ('Scout-walk-left-1.png', '_Scout-walk-left-1.png'),
    ('Scout-walk-right-1.png', '_Scout-walk-right-1.png'),
    ('Scout-walk-left-2.png', '_Scout-walk-left-2.png'),
    ('Scout-walk-right-2.png', '_Scout-walk-right-2.png'),
]

if __name__ == "__main__":
    for i, o in io:
        input_png_path = base_path + i
        output_png_path = base_path + o
        swap_file_names(input_png_path, output_png_path)