import AbstractComponent from './abstract-component.js';
import {remove, formatDate} from './../utils/render.js';
import {createXhr} from './../utils/server.js';

/* Возвращает разметку комментариев */
const createCommentsMarkup = (comments) => {
  return comments
    .map((comment) => {
      return (
        `<li class="post__comment-item">
          <span class="post__comment-date">${formatDate(comment.date)}</span>
          <p class="post__comment-text">${comment.text}</p>
        </li>`
      );
    })
    .join(`\n`);
};

/* Возвращает шаблон поста с комментариями */
const createPostDetailTemplate = (post) => {
  const {id, url, comments} = post;
  const commentsMarkup = createCommentsMarkup(comments);
  return (
    `<section class="popup post">
      <h2 class="visually-hidden">Расширенная информация о посте</h2>
      <button class="post__close" type="button"><span class="visually-hidden">Закрыть</span></button>
      <form class="post__form" method="post" action="https://boiling-refuge-66454.herokuapp.com/images/${id}/comments" autocomplete="off">
        <img class="post__photo" src="${url}">
        ${comments.length ? `<ul class="post__comments-list">
          ${commentsMarkup}
        </ul>` : ``}
        <div class="post__user-controls">
          <input class="post__user-input" type="text" name="name" placeholder="Ваше имя">
          <input class="post__user-input" type="text" name="comment" placeholder="Ваш комментарий">
          <button class="post__comment-submit" type="submit">Оставить комментарий</button>
        </div>
      </form>
    </section>`
  );
};

/* Экспортирует компонент поста с комментариями */
export default class PostDetailComponent extends AbstractComponent {
  constructor(post, overlay) {
    super();
    this._post = post;
    this._overlay = overlay;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    // this._removeComponent = this._removeComponent.bind(this);

    this.setOnCloseButtonClick();
    this.setOnFormSubmit();
    this.setOnEscKeyDown();
  }

  /* Возвращает разметку компонента */
  getTemplate() {
    return createPostDetailTemplate(this._post);
  }

  /* Закрывает попап */
  setOnCloseButtonClick() {
    this.getElement().querySelector(`.post__close`)
      .addEventListener(`click`, () => {
        this._removePopup();
      });
  }

  /* Обработчик отправки формы */
  setOnFormSubmit() {
    const formElement = this.getElement().querySelector(`.post__form`);
    formElement.addEventListener(`submit`, (evt) => {
        const formData = new FormData(formElement);
        const data = JSON.stringify({
          name: formData.get(`name`),
          comment: formData.get(`comment`)
        });
      evt.preventDefault();

      createXhr(() => {
        this._removePopup();
      }, `POST`, `https://boiling-refuge-66454.herokuapp.com/images/${this._post.id}/comments`, data);
    });
  }

  /* Закрывает попап при нажатию на Esc*/
  setOnEscKeyDown() {
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  /* Обработчик нажатия на клавишу Esc */
  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._removePopup();
    }

    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  /* Удаляем попап и оверлей */
  _removePopup() {
    remove(this);
    this._overlay.classList.toggle(`overlay--closed`);
  }
}
