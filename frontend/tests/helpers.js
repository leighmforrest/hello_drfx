export const testFile = (
  file_name = 'test_image.png',
  file_type = 'image/png',
  content = "hello there"
) =>  new File(
      [content],
      file_name,
      { type: file_type },
    );
