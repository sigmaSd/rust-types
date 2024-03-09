import { Result } from "./mod.ts";
import { assert, assertEquals } from "jsr:@std/assert";

Deno.test("Result", () => {
  {
    const result = Result.wrap(() => Deno.readTextFileSync("./mod.ts"));
    assert(result.isOk());
    assertEquals(result.ok, Deno.readTextFileSync("./mod.ts"));
  }
  {
    const result = Result.wrap<string, Deno.errors.NotFound>(() =>
      Deno.readTextFileSync("doesnt-exist")
    );
    assert(result.isErr());
    //@ts-ignore: code does exist
    assertEquals(result.err.code, "ENOENT");
  }
});

Deno.test("Async Result", async () => {
  {
    const result = await Result.wrapAsync(() => Deno.readTextFile("./mod.ts"));
    assert(result.isOk());
    assertEquals(result.ok, Deno.readTextFileSync("./mod.ts"));
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
