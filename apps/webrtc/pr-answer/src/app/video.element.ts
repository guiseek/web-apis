import { BuiltIn, Emitter, event, on } from '@web-apis/ui-web';

@BuiltIn('web-video', { extends: 'video' })
export class VideoElement extends HTMLVideoElement {
  @event()
  start!: Emitter<void>;

  #crossOrigin = 'anonymous';
  get crossOrigin() {
    return this.#crossOrigin
  }
  set crossOrigin(value: string) {
    this.#crossOrigin = value
  }

  @on('click')
  onClick() {
    if (this.paused) this.play();
    else this.pause();
  }

  @on('play')
  onStart() {
    this.start.emit();
  }

  connected() {

  }
}

declare global {
  interface HTMLElementTagNameMap {
    ['video[is="web-video"]']: VideoElement;
  }
  interface HTMLElementEventMap {
    start: CustomEvent<void>;
  }
}
