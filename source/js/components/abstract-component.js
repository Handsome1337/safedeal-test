import {createElement} from './../utils/render.js';

export default class AbstractComponent {
  constructor () {
    /* Сохраняет DOM-узел */
    this._element = null;
  }

  /* Бросает исключение, если объект был создан без метода getTemplate */
  getTemplate() {
    throw new Error(`Метод getTemplate не реализован у наследника`);
  }

  /* Если DOM-узла раньше не существовало, сохраняет созданный из шаблона DOM-узел и возвращает его */
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  /* Удаляет ссылку на созданный DOM-узел */
  removeElement() {
    this._element = null;
  }
}
