import type { CallbackFilter } from '../interfaces';

export const filter = <T>(items: T[], callback: CallbackFilter<T>) =>
  items.filter(callback);
