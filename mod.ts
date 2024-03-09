export class Result<T, E> {
  #value?: T;
  #error?: E;

  constructor({ value, error }: { value: T; error: E }) {
    this.#value = value;
    this.#error = error;
  }

  get ok() {
    return this.#value!;
  }

  get err() {
    return this.#error!;
  }

  isOk() {
    return this.#error === undefined;
  }

  isErr() {
    return this.#error !== undefined;
  }

  expect(msg: string): T {
    if (this.#error !== undefined) {
      throw new Error(`${msg} - ${this.#error}`);
    }
    return this.#value!;
  }

  static wrap<T, E>(callback: () => T): Result<T, E> {
    try {
      return new Result({ value: callback(), error: undefined as E });
      // deno-lint-ignore no-explicit-any
    } catch (e: any) {
      return new Result({ value: undefined as T, error: e as E });
    }
  }

  static async wrapAsync<T, E>(
    callback: () => Promise<T>,
  ): Promise<Result<T, E>> {
    try {
      return new Result({ value: await callback(), error: undefined as E });
      // deno-lint-ignore no-explicit-any
    } catch (e: any) {
      return new Result({ value: undefined as T, error: e as E });
    }
  }
}

export function Ok<T, E>(value: T): Result<T, E> {
  return new Result({ value, error: undefined as E });
}

export function Err<T, E>(error: E): Result<T, E> {
  return new Result({ value: undefined as T, error });
}
