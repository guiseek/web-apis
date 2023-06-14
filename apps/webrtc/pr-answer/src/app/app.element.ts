import {
  html,
  child,
  delay,
  listen,
  children,
  Autonomous,
  Connected,
  AfterConnected,
  AfterQueued,
} from '@web-apis/ui-web';
import './app.element.scss';

@Autonomous('app-root')
export class AppElement
  extends HTMLElement
  implements Connected, AfterConnected, AfterQueued
{
  template = html`
    <form>
      <input name="cmd" />
    </form>

    <ol>
      <li>a</li>
      <li>b</li>
      <li>c</li>
    </ol>

    <video is="web-video"></video>
  `;

  @delay(2000)
  @listen('form', 'change', 'target')
  onChange(ev: unknown) {
    console.log(ev);
  }

  @child('form')
  form!: HTMLFormElement;

  @child('video')
  video!: HTMLVideoElement;

  @children('li')
  items!: HTMLLIElement[];

  @listen('video', 'start')
  onPlayed(ev: CustomEvent) {
    console.log(ev);
  }

  connected() {
    console.log(this.form);
    console.log(this.video);
    console.log(this.items);
  }

  afterConnected() {
    console.log(this.form);
    console.log(this.video);
    console.log(this.items);

    if (this.video) {
      this.video.src = `https://guiseek.github.io/video-preview/web-standards-for-the-future.mp4`;
    }
  }

  afterQueued() {
    console.log('afterQueued');
  }
}
