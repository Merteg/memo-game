import { server_url } from './config.json';


export function shuffleArray(arr) {
  let array = arr;
  array.push(...arr);
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return arr;
}

export async function request(path="", method="GET", data=null) {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const response = await fetch(server_url + path, {
    method: method,
    headers: myHeaders,
    mode: 'cors',
    body: data,
  });
  if (response.status < 200 || response.status >= 300) {
    console.log(`Something goes wrong (Error #${response.status})`);
  }
  const result = await response.json();
  return result;
}
