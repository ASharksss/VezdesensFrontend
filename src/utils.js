/*export const STATIC_HOST = 'http://localhost:5000/static'
export const AVATAR_HOST = 'http://localhost:5000/static/avatar'*/
export const AVATAR_HOST = 'https://backend.vezdesens.ru/static/avatar'
export const STATIC_HOST = 'https://backend.vezdesens.ru/static'

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

export const encryptArrayWithKey = (array) => {
	const key = 'tsharksss'
	const arrayString = JSON.stringify(array);
	let encryptedString = "";
	for (let i = 0; i < arrayString.length; i++) {
		const charCode = arrayString.charCodeAt(i);
		const keyChar = key.charCodeAt(i % key.length);
		const encryptedCharCode = charCode + keyChar;
		encryptedString += String.fromCharCode(encryptedCharCode);
	}
	return encryptedString;
}

export function formatDateToRelative(date) {
	let options = {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
	return date.toLocaleDateString("ru-RU", options);
}

export function pluralRusVariant(x) {
	let lastTwoDigits = x % 100;
	let tens = Math.floor(lastTwoDigits / 10);
	if (tens === 1) {
		return 2;
	}
	let ones = lastTwoDigits % 10;
	if (ones === 1) {
		return 0;
	}
	if (ones >= 2 && ones <= 4) {
		return 1;
	}
	return 2;
}

function formatHours(hours) {
	let suffix = ["час", "часа", "часов"][pluralRusVariant(hours)];
	return hours + " " + suffix + " назад";
}

function formatMinutes(minutes) {
	if (minutes % 10 === 1 && minutes % 100 !== 11) {
		return minutes + ' минута назад';
	} else if ([2, 3, 4].includes(minutes % 10) && ![12, 13, 14].includes(minutes % 100)) {
		return minutes + ' минуты назад';
	} else {
		return minutes + ' минут назад';
	}
}

export function relativeDate(date) {
	let today = new Date();
	let timeDate = new Date(date);

	let yesterday = new Date();
	yesterday.setUTCDate(yesterday.getUTCDate() - 1);
	yesterday.setUTCHours(0,0,0,0);

	let seconds = Math.floor((today - date) / 1000);
	let minutes = Math.floor(seconds / 60);
	let hours = Math.floor(minutes / 60);
	let days = Math.floor(hours / 24);

	if (seconds < 60) {
		return "Только что";
	} else if (minutes < 60) {
		return formatMinutes(minutes)
	} else if (hours < 24) {
		return formatHours(hours)
	} else if (days < 2) {
		today.setUTCHours(0,0,0,0);
		timeDate.setUTCHours(0,0,0,0)
		if (today.getTime() === timeDate.getTime()) {
			return "Сегодня в " + formatDateToRelative(date).split("в ")[1];
		} else if (yesterday.getTime() === timeDate.getTime()) {
			return "Вчера в " + formatDateToRelative(date).split("в ")[1];
		} else {
			return formatDateToRelative(date);
		}
	} else if (days < 31) {
		return `${days} ${["день", "дня", "дней"][pluralRusVariant(days)]} назад`;
	} else {
		return formatDateToRelative(date);
	}
}
