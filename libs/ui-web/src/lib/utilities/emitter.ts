import { EmitterOptions } from '../interfaces/emitter';

export class Emitter<T = unknown> {
  constructor(private target: HTMLElement, private eventName: string) {}

  emit(value: T, options?: EmitterOptions) {
    this.target.dispatchEvent(
      new CustomEvent<T>(this.eventName, { detail: value, ...options })
    );
  }
}
