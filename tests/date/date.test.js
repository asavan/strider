import test from "node:test";
import assert from "node:assert/strict";

import dateObj from "../utils/dateUtils.js";

test("toUnixTimeStamp", () => {
    const dateStr = "17:54:28 24.01.2024";
    const tt = dateObj.toUnixTimeStamp(dateStr);
    const result = 1706115268;
    assert.equal(result, tt);
});

test("toUnixTimeStampBad", () => {
    const dateStr = "17:54:88 24.01.2024";
    assert.throws(() => dateObj.toUnixTimeStamp(dateStr), {
        name: "Error",
        message: "Bad date",
        info: {
            date: "17:54:88 24.01.2024",
            reason: "unit out of range",
        },
    }
    );
});
