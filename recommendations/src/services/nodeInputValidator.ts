export function validateNodeInput(
  nodeType: string,
  propertyName: string,
  propertyValue: string
): boolean {
  if (!nodeType || !propertyName || !propertyValue) {
    return false;
  }
  if (nodeType == "User" && propertyName == "email") {
    return true;
  }

  if (nodeType == "Product" && propertyName == "name") {
    return true;
  }
  return false;
}
