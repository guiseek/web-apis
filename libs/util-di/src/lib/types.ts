import { Token } from './token';

type AbstractType<T> = abstract new (...params: unknown[]) => T;

interface Type<T> extends Function {
  new (...params: unknown[]): T;
}

type ProviderKey<T> = AbstractType<T> | Token<T>;
type ProviderImpl<T> = T | Type<T>;

interface Provider<T = unknown> {
  for: ProviderKey<T>;
  use?: ProviderImpl<T>;
  add?: ProviderKey<T>[];
}

export type { AbstractType, Type, Provider, ProviderKey, ProviderImpl };
