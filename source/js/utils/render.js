export const RenderPosition = {
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

/* Создаёт DOM-элемент */
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

/* Отрисовывает элемент, добавляя его в разметку */
export const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
    case RenderPosition.AFTEREND:
      container.after(component.getElement());
      break;
  }
};

/* Удаляет компонент */
export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

/* Возвращает отформатированное значение дня или месяца. Если принято значение от 0 до 9, добавляет 0 спереди */
const castDateFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

/* Возвращает отформатированную дату */
export const formatDate = (milliseconds) => {
  const date = new Date(milliseconds);

  const day = castDateFormat(date.getDate());
  const month = castDateFormat(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};
