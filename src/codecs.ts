import * as t from "io-ts";
import { either } from "fp-ts/lib/Either";

export const numberFromStringCodec = new t.Type<number, string, unknown>(
    "NumberFromString",
    t.number.is,
    (u, c) =>
      either.chain(t.string.validate(u, c), s => {
        const n = +s;
        return isNaN(n)
          ? t.failure(u, c, "cannot parse to a number")
          : t.success(n);
      }),
    String
  );