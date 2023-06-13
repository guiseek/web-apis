import { AutonomousOptions, UIWebOptions } from '../interfaces';
import { getCycle, attachShadow, clone } from '../utilities';

export function Autonomous({ selector, ...opts }: AutonomousOptions) {
  return function (target: UIWebOptions) {
    const cycle = getCycle(target);

    let shadow: ShadowRoot | null = null;

    let html: Element;

    target.prototype.attributeChangedCallback = function (
      name: string,
      prev: string,
      next: string
    ) {
      const { template } = this;

      if (prev !== next) {
        console.log(prev);
        console.log(next);
        this[name] = next;
      }

      console.log(template);

      if (typeof template === 'function') {
        // html = clone(template());
      }


      if (shadow === null) {
        shadow = attachShadow(this, opts, html);
      }

      if (shadow instanceof ShadowRoot) {
        // shadow.innerHTML = template.innerHTML
      }
      console.log(shadow);
      // const html = clone(template);
      // if (html && styles) {

      //   html.append(styles);
      // }
    };

    target.prototype.connectedCallback = function () {
      const { template, styles } = this;

      if (!html && typeof template === 'function') {
        console.log(this.userid);

        html = clone(template());
      }

      if (html && styles) {
        html.append(styles);
      }

      if (shadow === null) {
        shadow = attachShadow(this, opts, html);
      }

      if (shadow instanceof ShadowRoot) {
        // shadow.innerHTML = template.innerHTML
        // shadow.innerHTML = html.innerHTML
      }

      if (this.connected) {
        this.connected.call(this);
      }

      cycle.connected.call(this);
    };

    customElements.define(selector, target);
  };
}
