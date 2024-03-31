/**
 * A module for handling results of computations, representing either success or failure.
 *
 * @example
 * ```ts
 * // Creating a Result representing a successful computation
 * const result = Ok(42);
 *
 * // Retrieving the value from the Result
 * const value = result.ok; // 42
 *
 * // Creating a Result representing a failed computation
 * const errorResult = Err("Something went wrong");
 *
 * // Retrieving the error from the Result
 * const error = errorResult.err; // "Something went wrong"
 * ```
 *
 * @module
 */

/**
 * Represents an empty value.
 */
const EMPTY = Symbol("EMPTY");
type EMPTY = typeof EMPTY;

/**
 * Represents a Result type that can hold either a value or an error.
 * @template T - The type of the value.
 * @template E - The type of the error.
 */
export class Result<T, E> {
  /**
   * Creates a new Result instance.
   * @param {Object} options - The options for creating the Result.
   * @param {T | EMPTY} options.value - The value of the Result.
   * @param {E | EMPTY} options.error - The error of the Result.
   */
  constructor({ value, error }: { value: T | EMPTY; error: E | EMPTY }) {
    this.#value = value;
    this.#error = error;
  }

  #value: T | EMPTY;
  #error: E | EMPTY;

  /**
   * Retrieves the value of the Result if it's Ok.
   * @returns {T} The value of the Result.
   * @throws {Error} Throws an error with the specified message if the Result is Err.
   */
  get ok(): T {
    return this.#value as T;
  }

  /**
   * Retrieves the error of the Result if it's Err.
   * @returns {E} The error of the Result.
   */
  get err(): E {
    return this.#error as E;
  }

  /**
   * Checks if the Result is Ok.
   * @returns {boolean} Returns true if the Result is Ok, false otherwise.
   */
  isOk(): boolean {
    return this.#value !== EMPTY;
  }

  /**
   * Checks if the Result is Err.
   * @returns {boolean} Returns true if the Result is Err, false otherwise.
   */
  isErr(): boolean {
    return this.#error !== EMPTY;
  }

  /**
   * Retrieves the value of the Result if it's Ok, otherwise returns the specified default value.
   * @param {T} other - The default value to return if the Result is Err.
   * @returns {T} The value of the Result if it's Ok, otherwise the default value.
   */
  unwrapOr(other: T): T {
    if (this.#error !== EMPTY) {
      return other;
    }
    return this.#value as T;
  }

  /**
   * Retrieves the value of the Result if it's Ok, otherwise throws an error with the specified message.
   * @param {string} msg - The error message to throw if the Result is Err.
   * @returns {T} The value of the Result if it's Ok.
   * @throws {Error} Throws an error with the specified message if the Result is Err.
   */
  expect(msg: string): T {
    if (this.#error !== EMPTY) {
      throw new Error(`${msg} - ${this.#error}`);
    }
    return this.#value as T;
  }

  /**
   * Wraps a synchronous callback in a Result.
   * @template T - The type of the value returned by the callback.
   * @template E - The type of the error that may be thrown by the callback.
   * @param {Function} callback - The synchronous callback to wrap.
   * @returns {Result<T, E>} A Result containing the value returned by the callback or an error.
   */
  static wrap<T, E>(callback: () => T): Result<T, E> {
    try {
      return new Result({ value: callback(), error: EMPTY }) as Result<T, E>;
    } catch (e) {
      return new Result({ value: EMPTY, error: e }) as Result<T, E>;
    }
  }

  /**
   * Wraps an asynchronous callback in a Promise that resolves to a Result.
   * @template T - The type of the value resolved by the callback.
   * @template E - The type of the error that may be rejected by the callback.
   * @param {Function} callback - The asynchronous callback to wrap.
   * @returns {Promise<Result<T, E>>} A Promise that resolves to a Result containing the value resolved by the callback or an error.
   */
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

/**
 * Creates a Result representing a successful computation with the specified value.
 * @template T - The type of the value.
 * @template E - The type of the error.
 * @param {T} value - The value of the Result.
 * @returns {Result<T, E>} A Result representing a successful computation with the specified value.
 */
export function Ok<T, E>(value: T): Result<T, E> {
  return new Result({ value, error: EMPTY }) as Result<T, E>;
}

/**
 * Creates a Result representing a failed computation with the specified error.
 * @template T - The type of the value.
 * @template E - The type of the error.
 * @param {E} error - The error of the Result.
 * @returns {Result<T, E>} A Result representing a failed computation with the specified error.
 */
export function Err<T, E>(error: E): Result<T, E> {
  return new Result({ value: EMPTY, error }) as Result<T, E>;
}
