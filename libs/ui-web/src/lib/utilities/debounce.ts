import { DebounceOptions, DebouncedFunction } from '../interfaces';

function debounce<F extends (...args: any[]) => any>(
  func: F,
  wait = 0,
  options: DebounceOptions = {}
): DebouncedFunction<F> {
  let timeoutId: ReturnType<typeof setTimeout> | null;
  let lastArgs: Parameters<F> | null;
  let lastThis: any;
  let result: ReturnType<F> | undefined;
  let lastCallTime: number | null;
  let lastInvokeTime = 0;

  const { leading = false, maxWait, trailing = true } = options;

  const invokeFunc = (time: number) => {
    const args = lastArgs!;
    const thisArg = lastThis;

    lastArgs = null;
    lastThis = null;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
  };

  const startTimer = (pendingFunc: () => void, waitTime: number) => {
    return setTimeout(pendingFunc, waitTime);
  };

  const shouldInvoke = (time: number) => {
    const timeSinceLastCall = time - (lastCallTime || 0);
    const timeSinceLastInvoke = time - lastInvokeTime;

    return (
      !lastCallTime ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxWait !== undefined && timeSinceLastInvoke >= maxWait)
    );
  };

  const trailingEdge = (time: number) => {
    timeoutId = null;

    if (trailing && lastArgs) {
      invokeFunc(time);
    }
  };

  const leadingEdge = (time: number) => {
    lastInvokeTime = time;
    timeoutId = startTimer(() => trailingEdge(time), wait);
    if (leading) {
      invokeFunc(time);
    }
  };

  const timerExpired = () => {
    const currentTime = Date.now();
    if (shouldInvoke(currentTime)) {
      trailingEdge(currentTime);
    }
  };

  const debounced = function (this: any, ...args: Parameters<F>) {
    lastArgs = args;
    lastThis = this;
    lastCallTime = Date.now();

    if (!timeoutId) {
      leadingEdge(lastCallTime);
    } else {
      clearTimeout(timeoutId);
      timeoutId = startTimer(timerExpired, wait);
    }

    return result;
  };

  debounced.cancel = () => {
    clearTimeout(timeoutId!);
    lastArgs = null;
    lastCallTime = null;
    timeoutId = null;
  };

  return debounced;
}

export default debounce;
