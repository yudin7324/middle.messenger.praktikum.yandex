function isEqual(a: any, b: any): boolean {
  if (a === b) {
    return true;
  }
  if (
    a === null ||
    typeof a !== "object" ||
    b === null ||
    typeof b !== "object"
  ) {
    return false;
  }
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  for (const key of aKeys) {
    if (!bKeys.includes(key) || !isEqual(a[key], b[key])) {
      return false;
    }
  }
  return true;
}

export default isEqual;
