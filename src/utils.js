export const STATIC_HOST = 'http://localhost:5000/static'

export const group = (array) => {
	const blockArray = array.filter(item => item.typeAdId === 1)
	const commercialArray = array.filter(item => item.typeAdId === 2)
	const vipArray = array.filter(item => item.typeAdId === 3)
  const resultBlock = [], resultCommercial = []
  for (let i = 0; i < blockArray.length; i += 5) {
		resultBlock.push(blockArray.slice(i, i + 5));
  }
  for (let i = 0; i < commercialArray.length; i += 3) {
		let chunk
		if (vipArray.length > 0) {
			chunk = commercialArray.slice(i, i + 2);
			chunk.push(vipArray.shift());
		} else {
			chunk = commercialArray.slice(i, i + 3);
		}
		resultCommercial.push(chunk);
  }
  return {resultBlock, resultCommercial};
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

export const numberWithSpaces = (x) => {
  let parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
}

export const DataURIToBlob = (dataURI) => {
	const splitDataURI = dataURI.split(',')
	const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
	const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

	const ia = new Uint8Array(byteString.length)
	for (let i = 0; i < byteString.length; i++)
		ia[i] = byteString.charCodeAt(i)

	return new Blob([ia], { type: mimeString })
}
