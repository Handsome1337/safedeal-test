import AbstractComponent from './abstract-component.js';

/* Возвращает шаблон поста. Атрибут href добавляется ссылке для того,
чтобы она могла быть в фокусе и могла быть открыта с помощью нажатия на клавишу Enter */
const createPostTemplate = (post) => {
  const {url} = post;
  return (
    `<li class="photos-list__item">
      <a class="photos-list__link" href="#" aria-label="Полноразмерное изображение с комментариями">
        <img class="photos-list__image" src="${url}" alt="Фотография пользователя">
      </a>
    </li>`
  );
};

/* Экспортирует компонент поста */
export default class PostComponent extends AbstractComponent {
  constructor(post) {
    super();
    this._post = post;
  }

  /* Возвращает разметку компонента */
  getTemplate() {
    return createPostTemplate(this._post);
  }

  /* Устанавливает обработчик клика на фотографию поста */
  setOnPostClick(handler) {
    this.getElement().querySelector(`a`)
      .addEventListener(`click`, () => {
        handler(this._post.id);
      });
  }
}
