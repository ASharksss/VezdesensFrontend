export const group = (array, size) => {
  const result = []
  let length = array.length;
  if (array.length > 15) {
    length = 15
  }
  for (let i = 0; i < length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}