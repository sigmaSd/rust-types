# Rust Types

`rust-types` is a TypeScript library providing Rust-like Result and Option types for handling success or failure and optional values, respectively.

## Usage

### Result

The Result type represents either success with a value or failure with an error.

```typescript
import { Result, Ok, Err } from 'jsr:@sigmasd/rust-types/result';

const result = Ok(42); // Result with value 42
const errorResult = Err("Something went wrong"); // Result with error
```

### Option

The Option type represents an optional value that may or may not exist.

```typescript
import { Option } from 'jsr:@sigmasd/rust-types/option';

const option = Option.wrap(42); // Option with value 42
const emptyOption = Option.wrap(null); // Empty Option
```

## Examples

Check out the tests for examples.
