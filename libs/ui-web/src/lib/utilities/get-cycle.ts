import { noop } from './noop';

interface Cycle {
  connected: () => void;
  disconnected: () => void;
  attributeChanged: (
    name: string,
    prev: string | null,
    next: string | null
  ) => void;
}

export function getCycle(target: CustomElementConstructor): Cycle {
  return {
    connected: target.prototype.connectedCallback ?? noop,
    disconnected: target.prototype.disconnectedCallback ?? noop,
    attributeChanged: target.prototype.attributeChangedCallback ?? noop,
  };
}
