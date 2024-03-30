export class Option<T> {
  #value: T | undefined | null;

  constructor(
    value: T | undefined | null,
  ) {
    this.#value = value;
  }

  get some(): T {
    return this.#value as T;
  }

  isSome(): boolean {
    return this.#value !== undefined;
  }

  isNone(): boolean {
    return this.#value === undefined;
  }

  expect(msg: string): T {
    if (this.#value === undefined || this.#value === null) {
      throw new Error(`${msg} - Option is None`);
    }
    return this.#value;
  }

  static wrap<T>(
    value: T | undefined | null,
  ): Option<T> {
    return new Option(value);
  }
}
