import { AppElement } from './app/app.element';
import { VideoElement } from './app/video.element';

declare global {
  interface HTMLElementTagNameMap {
    ['app-root']: AppElement;
    ['video[is="web-video"]']: VideoElement;
  }
  interface HTMLElementEventMap {
    start: CustomEvent<void>;
  }
}

export { AppElement, VideoElement }
