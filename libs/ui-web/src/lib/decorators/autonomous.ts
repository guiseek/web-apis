import { AutonomousOptions, UIWebOptions } from '../interfaces';
import { getCycle, attachShadow, clone } from '../utilities';

export function Autonomous(
  selector: `${string}-${string}`,
  opts?: AutonomousOptions
) {
  return function (target: UIWebOptions) {
    const cycle = getCycle(target);

    target.prototype.attributeChangedCallback = function (
      name: string,
      prev: string,
      next: string
    ) {
      if (prev !== next) {
        this[name] = next;
      }
    };

    target.prototype.connectedCallback = function () {
      const { template, styles } = this;

      if (template) {
        const html = clone(template);
        if (html && styles) {
          html.append(styles);
        }
        attachShadow(this, opts, html);
      }

      if (this.connected) {
        this.connected.call(this);
      }

      cycle.connected.call(this);

      if (this.afterConnected) {
        this.afterConnected.call(this);
      }

      queueMicrotask(() => {
        if (this.afterQueued) {
          this.afterQueued.call(this);
        }
      });
    };

    customElements.define(selector, target);
  };
}
