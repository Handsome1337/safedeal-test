import PostComponent from './../components/post.js';
import PostDetailComponent from './../components/post-detail.js';
import {RenderPosition, render} from './../utils/render.js';
import {createXhr} from './../utils/server.js';

export default class PostController {
  constructor(container, footer, overlay) {
    this._container = container;
    this._footer = footer;
    this._overlay = overlay;

    this._postComponent = null;
    this._postDetailComponent = null;
  }

  render(post) {
    this._postComponent = new PostComponent(post);

    /* При клике на пост загружается большое изображение и список комментариев, в разметку добавляется попап и оверлей */
    this._postComponent.setOnPostClick((id) => {
      createXhr((post) => {
        this._postDetailComponent = new PostDetailComponent(post, this._overlay);
        render(this._footer, this._postDetailComponent, RenderPosition.AFTEREND);
        this._overlay.classList.toggle(`overlay--closed`);
      }, `GET`, `https://boiling-refuge-66454.herokuapp.com/images/${id}`);
    });

    render(this._container, this._postComponent, RenderPosition.BEFOREEND);
  }
}
