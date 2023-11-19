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

export const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // добавляем ведущий ноль, если месяц < 10
  const day = String(d.getDate()).padStart(2, '0'); // добавляем ведущий ноль, если день < 10
  return `${day}/${month}/${year}`;
}

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}