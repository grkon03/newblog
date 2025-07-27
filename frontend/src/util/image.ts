export function IsImage(file: File) {
  return file.type.substring(0, 5) === 'image';
}
