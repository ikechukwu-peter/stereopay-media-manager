export function isObjectEmpty(objectName: object) {
  return (
    objectName &&
    Object.keys(objectName).length > 0 &&
    objectName.constructor === Object
  );
}
