export function concat<T>(value: T): string {
  if (Array.isArray(value)) {
    return value.map((item) => concat(item)).join('');
  }

  if (typeof value === 'object' && value !== null) {
    return Object.values(value)
      .map((item) => concat(item))
      .join('');
  }

  return String(value);
}
