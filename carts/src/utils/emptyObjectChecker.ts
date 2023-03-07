export function isEmpty<Object>(object: Object): boolean {
  if (object == null) {
    return true;
  }
  return (object &&
    Object.keys(object).length === 0 &&
    object.constructor === Object) as boolean;
}
