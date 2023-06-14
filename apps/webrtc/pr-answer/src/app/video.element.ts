import { BuiltIn, Emitter, event, on } from '@web-apis/ui-web';

@BuiltIn('web-video', { extends: 'video' })
export class VideoElement extends HTMLVideoElement {
  @event()
  start!: Emitter<void>;

  @on('click')
  onClick() {
    if (this.paused) this.play();
    else this.pause();
  }

  @on('play')
  onStart() {
    this.start.emit();
  }
}
