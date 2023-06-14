interface DebounceOptions {
  leading?: boolean;
  maxWait?: number;
  trailing?: boolean;
}

type DebouncedFunction<F extends (...args: any[]) => any> = {
  (...args: Parameters<F>): void;
  cancel: () => void;
};

export type { DebounceOptions, DebouncedFunction };
