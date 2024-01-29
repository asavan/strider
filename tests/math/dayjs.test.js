import test from "node:test";
import assert from "node:assert/strict";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
// import 'dayjs/locale/ru'; // load on demand


test("dayjs_simple", () => {
    const date1 = dayjs("15.10.2020", "DD.MM.YYYY");
    console.log(date1);
});

test("dayjs_parse", () => {
    const dateStr = "17:54:28 24.01.2024";
    const date1 = dayjs.tz(dateStr, "HH:mm:ss DD.MM.YYYY", "Europe/Belgrade");
    const timestamp = date1.valueOf();
    const tt = timestamp / 1000;
    const result = 1706115268;
    assert.equal(result, tt);
});
