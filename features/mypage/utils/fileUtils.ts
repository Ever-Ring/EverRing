export default function validateImageSize(file: File) {
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  return file.size < MAX_FILE_SIZE;
}
