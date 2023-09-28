from inline_svg_styles import apply_css_to_svg


if __name__ == "__main__":
    file_path_tuples = [
        ('test/Scout-face-left.svg', 'editions/free/src/svglibrary/Scout-face-left.svg'), 
        ('test/Scout-face-right.svg', 'editions/free/src/svglibrary/Scout-face-right.svg'), 
        ('test/Scout-point-left.svg', 'editions/free/src/svglibrary/Scout-point-left.svg'), 
        ('test/Scout-point-right.svg', 'editions/free/src/svglibrary/Scout-point-right.svg'), 
        ('test/Scout-walk-left-1.svg', 'editions/free/src/svglibrary/Scout-walk-left-1.svg'), 
        ('test/Scout-walk-left-2.svg', 'editions/free/src/svglibrary/Scout-walk-left-2.svg'), 
        ('test/Scout-walk-right-1.svg', 'editions/free/src/svglibrary/Scout-walk-right-1.svg'), 
        ('test/Scout-walk-right-2.svg', 'editions/free/src/svglibrary/Scout-walk-right-2.svg'), 
    ]

    for input_file, output_file in file_path_tuples:
        apply_css_to_svg(input_file, output_file)

    # file_paths = [
    #     'editions/free/src/svglibrary/_Scout-face-left.svg',  
    #     'editions/free/src/svglibrary/_Scout-face-right.svg',  
    #     'editions/free/src/svglibrary/_Scout-point-left.svg',  
    #     'editions/free/src/svglibrary/_Scout-point-right.svg',  
    #     'editions/free/src/svglibrary/_Scout-walk-left-1.svg',
    #     'editions/free/src/svglibrary/_Scout-walk-left-2.svg',
    #     'editions/free/src/svglibrary/_Scout-walk-right-1.svg',
    #     'editions/free/src/svglibrary/_Scout-walk-right-2.svg',
    # ]
    # import os

    # def rename_files_with_prefix(file_paths, prefix):
    #     for file_path in file_paths:
    #         # Split the file path into directory and filename
    #         directory, filename = os.path.split(file_path)

    #         # Check if the filename starts with the prefix
    #         if filename.startswith(prefix):
    #             # Remove the prefix
    #             new_filename = filename[len(prefix):]
    #         else:
    #             # Add the prefix
    #             new_filename = prefix + filename

    #         # Create the new file path
    #         new_file_path = os.path.join(directory, new_filename)

    #         # Rename the file
    #         os.rename(file_path, new_file_path)

    # # Example usage:
    # rename_files_with_prefix(file_paths, "_")

