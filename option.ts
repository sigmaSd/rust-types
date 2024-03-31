/**
 * A module for handling optional values.
 *
 * @example
 * ```ts
 * // Creating an Option with a value
 * const option = Option.wrap(42);
 *
 * // Checking if the Option has a value
 * const hasValue = option.isSome(); // true
 *
 * // Getting the value from the Option
 * const value = option.some; // 42
 *
 * // Creating an Option without a value
 * const emptyOption = Option.wrap(null);
 *
 * // Checking if the Option is empty
 * const isEmpty = emptyOption.isNone(); // true
 * ```
 *
 * @module
 */
export class Option<T> {
  #value: T | undefined | null;

  /**
   * Creates a new Option instance.
   * @param {T | undefined | null} value - The value of the Option.
   */
  constructor(value: T | undefined | null) {
    this.#value = value;
  }

  /**
   * Retrieves the value from the Option.
   * @returns {T} The value of the Option.
   * @throws {Error} Throws an error with the specified message if the Option is empty.
   */
  get some(): T {
    if (this.#value === undefined || this.#value === null) {
      throw new Error("Option is None");
    }
    return this.#value as T;
  }

  /**
   * Checks if the Option has a value.
   * @returns {boolean} Returns true if the Option has a value, false otherwise.
   */
  isSome(): boolean {
    return this.#value !== undefined;
  }

  /**
   * Checks if the Option is empty.
   * @returns {boolean} Returns true if the Option is empty, false otherwise.
   */
  isNone(): boolean {
    return this.#value === undefined;
  }

  /**
   * Retrieves the value from the Option if it has a value, otherwise throws an error with the specified message.
   * @param {string} msg - The error message to throw if the Option is empty.
   * @returns {T} The value of the Option if it has a value.
   * @throws {Error} Throws an error with the specified message if the Option is empty.
   */
  expect(msg: string): T {
    if (this.#value === undefined || this.#value === null) {
      throw new Error(`${msg} - Option is None`);
    }
    return this.#value;
  }

  /**
   * Wraps a value in an Option.
   * @param {T | undefined | null} value - The value to wrap in an Option.
   * @returns {Option<T>} An Option containing the specified value.
   */
  static wrap<T>(value: T | undefined | null): Option<T> {
    return new Option(value);
  }
}
