interface CallbackMap<T, R> {
  (item: T): R;
}

interface CallbackFilter<T> {
  (item: T): boolean;
}

interface CallbackReduce<T, R> {
  (previousValue: R, currentValue: T, currentIndex: number, array: T[]): R;
}

export type { CallbackFilter, CallbackMap, CallbackReduce };
