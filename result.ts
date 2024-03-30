const EMPTY = Symbol("EMPTY");
type EMPTY = typeof EMPTY;

export class Result<T, E> {
  #value: T | EMPTY;
  #error: E | EMPTY;

  constructor(
    { value, error }: { value: T | EMPTY; error: E | EMPTY },
  ) {
    this.#value = value;
    this.#error = error;
  }

  get ok(): T {
    return this.#value as T;
  }

  get err(): E {
    return this.#error as E;
  }

  isOk(): boolean {
    return this.#value !== EMPTY;
  }

  isErr(): boolean {
    return this.#error !== EMPTY;
  }

  expect(msg: string): T {
    if (this.#error !== EMPTY) {
      throw new Error(`${msg} - ${this.#error}`);
    }
    return this.#value as T;
  }

  static wrap<T, E>(
    callback: () => T,
  ): Result<T, E> {
    try {
      return new Result({ value: callback(), error: EMPTY }) as Result<T, E>;
    } catch (e) {
      return new Result({ value: EMPTY, error: e }) as Result<T, E>;
    }
  }

  static async wrapAsync<T, E>(
    callback: () => Promise<T>,
  ): Promise<Result<T, E>> {
    try {
      //deno-fmt-ignore
      return new Result({ value: await callback(), error: EMPTY }) as Result<T, E>;
    } catch (e) {
      return new Result({ value: EMPTY, error: e }) as Result<T, E>;
    }
  }
}

export function Ok<T, E>(
  value: T,
): Result<T, E> {
  return new Result({ value, error: EMPTY }) as Result<T, E>;
}

export function Err<T, E>(
  error: E,
): Result<T, E> {
  return new Result({ value: EMPTY, error }) as Result<T, E>;
}
