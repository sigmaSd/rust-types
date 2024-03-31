import { Option } from "./option.ts";
import { Result } from "./result.ts";
import { assert, assertEquals, assertThrows } from "jsr:@std/assert@0.221.0";

Deno.test("Result", () => {
  {
    const result = Result.wrap(() => Deno.readTextFileSync("./mod.test.ts"));
    assert(result.isOk());
    assertEquals(result.ok, Deno.readTextFileSync("./mod.test.ts"));
  }
  {
    const result = Result.wrap<string, Deno.errors.NotFound>(() =>
      Deno.readTextFileSync("doesnt-exist")
    );
    assert(result.isErr());
    //@ts-ignore: code does exist
    assertEquals(result.err.code, "ENOENT");

    assertEquals(result.unwrapOr("new value"), "new value");
  }
});

Deno.test("Async Result", async () => {
  {
    const result = await Result.wrapAsync(() =>
      Deno.readTextFile("./mod.test.ts")
    );
    assert(result.isOk());
    assertEquals(result.ok, Deno.readTextFileSync("./mod.test.ts"));
  }
  {
    const result = await Result.wrapAsync<string, Deno.errors.NotFound>(() =>
      Deno.readTextFile("doesnt-exist")
    );
    assert(result.isErr());
    //@ts-ignore: code does exist
    assertEquals(result.err.code, "ENOENT");
  }
});

Deno.test("option", () => {
  assertThrows(
    () => Option.wrap(undefined).expect("unwrap on none"),
  );
});
