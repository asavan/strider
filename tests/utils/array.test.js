import test from "node:test";
import assert from "node:assert/strict";

import arrayObj from "./arrayUtils.js";

test("lastK", () => {
    const arr = [[1, 2, 3, 4], [6, 7, 8, 9]];
    const slice = arrayObj.lastK(arr, 2);
    assert.deepStrictEqual(slice, [[3, 4], [8, 9]]);
});
