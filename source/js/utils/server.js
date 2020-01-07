  /* Экспортирует xhr-объект */
export const createXhr = (onSuccess, method, url, data) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.open(method, url);

  if (data) {
    xhr.setRequestHeader(`Content-Type`, `application/json`);
    xhr.send(data);
  } else {
    xhr.send();
  }

  xhr.addEventListener(`load`, () => {
    onSuccess(xhr.response);
  });
}
