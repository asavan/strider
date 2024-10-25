import test from "node:test";
import assert from "node:assert/strict";

import dateObj from "../utils/dateUtils.js";

test("toUnixTimeStamp", () => {
    const dateStr = "17:54:28 24.01.2024";
    const tt = dateObj.toUnixTimeStamp(dateStr);
    const result = 1706115268;
    assert.equal(result, tt);
});

test("parseInput", () => {
    let time = "1102";
    const len = time.length;
    const hourPart = time.substring(0, len-2);
    const minutePart = time.substring(len-2);
    const hours = Number.parseInt(hourPart);
    const minute = Number.parseInt(minutePart);

    assert.equal(len, 4);
    assert.equal(hourPart, "11");
    assert.equal(hours, 11);
    assert.equal(minute, 2);
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
