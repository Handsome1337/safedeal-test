import PostController from './controllers/post.js';
import {createXhr} from './utils/server.js';

/* Сохраняет контейнер для фотографий пользователей */
const photosList = document.querySelector(`.photos-list`);
const footer = document.querySelector(`.site-footer`);
const overlay = document.querySelector(`.overlay`);

createXhr((posts) => {
  posts.forEach((post) => {
    const postController = new PostController(photosList, footer, overlay);
    postController.render(post);
  });
}, `GET`, `https://boiling-refuge-66454.herokuapp.com/images`);
