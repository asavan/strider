import test from "node:test";
import assert from "node:assert/strict";

import { DateTime } from "luxon";

function findLineByLeastSquares(values_x, values_y) {
    var x_sum = 0;
    var y_sum = 0;
    var xy_sum = 0;
    var xx_sum = 0;
    var count = 0;

    /*
     * The above is just for quick access, makes the program faster
     */
    var x = 0;
    var y = 0;
    var values_length = values_x.length;

    if (values_length != values_y.length) {
        throw new Error("The parameters values_x and values_y need to have same size!");
    }

    /*
     * Above and below cover edge cases
     */
    if (values_length === 0) {
        return [ [], [] ];
    }

    /*
     * Calculate the sum for each of the parts necessary.
     */
    for (let i = 0; i < values_length; i++) {
        x = values_x[i];
        y = values_y[i];
        x_sum+= x;
        y_sum+= y;
        xx_sum += x*x;
        xy_sum += x*y;
        count++;
    }

    if (values_length != count) {
        throw new Error("Count error");
    }

    /*
     * Calculate m and b for the line equation:
     * y = x * m + b
     */
    const m = (count*xy_sum - x_sum*y_sum) / (count*xx_sum - x_sum*x_sum);
    const b = (y_sum/count) - (m*x_sum)/count;
    // console.log("findLineByLeastSquares", x_sum, y_sum, y_sum/count, m, b);
    return [m, b];
}

// https://www.freecodecamp.org/news/the-least-squares-regression-method-explained/
function updateFormula(currentData) {
    const pairsAmount = currentData.length;
    const sum = currentData.reduce((acc, pair) => ({
        x: acc.x + pair.x,
        y: acc.y + pair.y,
    }), { x: 0, y: 0 });

    const average = {
        x: sum.x / pairsAmount,
        y: sum.y / pairsAmount,
    };

    const slopeDividend = currentData
        .reduce((acc, pair) => acc + ((pair.x - average.x) * (pair.y - average.y)), 0);
    const slopeDivisor = currentData
        .reduce((acc, pair) => acc + (pair.x - average.x) ** 2, 0);


    const slope = slopeDivisor !== 0
        ? (slopeDividend / slopeDivisor)
        : 0;

    const coeficient = -(slope * average.x) + average.y;

    // console.log("updateFormula", sum, average, slopeDividend, slopeDivisor, slope, coeficient);
    return [slope, coeficient];
}

function arraysToObjects(arr1, arr2) {
    const currentData = [];
    for (let i = 0; i < arr1.length; ++i) {
        currentData.push({ x: arr1[i], y: arr2[i] });
    }
    return currentData;
}

function numPrediction(coeff, timestamp) {
    return Math.floor(coeff[0] * timestamp + coeff[1]);
}

function toUnixTimeStamp(str) {
    const date = DateTime.fromFormat(str, "HH:mm:ss dd.LL.yyyy", { zone: "Europe/Belgrade" });
    return date.toUnixInteger();
}

function approx1Formula(date) {
    const beginDate = Date.parse("2023-12-25T14:13:04.000Z");
    const diff = 11530326 - 0.49195 * (beginDate/1000);
    return numPrediction([0.49195, diff], date);
}

function approx2Formula(date) {
    // const beginDate = Date.parse("2023-12-25T14:13:04.000Z");
    // const diff1 = 11530326 - 0.5 * (beginDate/1000);
    const diff2 = -840180000;
    // console.log("diff2", diff1 - diff2);
    return numPrediction([0.5, diff2], date);
}

function approx3Formula(date) {
    const x = 0.59365;
    return numPrediction([x, -1000000000], date);
}

function screen0() {
    const timesStr = [
        "12:07:45 17.12.2023", "13:25:03 25.12.2023", "16:52:34 25.12.2023",
        "18:27:47 28.12.2023", "19:59:10 28.12.2023"
    ];
    const nums = [11216758, 11578632, 11590838, 11783178, 11786318];
    return [timesStr.map(toUnixTimeStamp), nums];
}

function screen1() {
    const timesStr = ["14:44:04 03.01.2024", "17:42:30 03.01.2024", "18:39:24 04.01.2024"];
    const nums = [11938989, 11947004, 11997135];
    return [timesStr.map(toUnixTimeStamp), nums];
}

function screen2() {
    const timesStr = ["17:18:45 08.01.2024", "19:48:36 08.01.2024", "17:55:02 10.01.2024", "19:42:15 10.01.2024"];
    const nums = [12085619, 12088098, 12192883, 12196428];
    return [timesStr.map(toUnixTimeStamp), nums];
}


function screen3() {
    const timesStr = ["17:53:12 13.01.2024", "18:52:02 22.01.2024", "20:42:14 22.01.2024", "17:54:28 24.01.2024"];
    const nums = [12323933, 12692567, 12694791, 12847765];
    return [timesStr.map(toUnixTimeStamp), nums];
}

function screen4() {
    const timesStr = ["18:56:55 01.02.2024", "20:48:23 01.02.2024"];
    const nums = [13278962, 13281432];
    return [timesStr.map(toUnixTimeStamp), nums];
}

function vicaApp() {
    return chomp(merge(screen0, screen1, screen2, screen3, screen4), -1);
}

function chomp(arr, num) {
    const [times, nums] = arr;
    if (num > 0) {
        return [times.slice(num), nums.slice(num)];
    } else if (num < 0) {
        return [times.slice(0, num), nums.slice(0, num)];
    } else {
        console.error("No Chomp");
        return arr;
    }
}

function xiaomiSms() {
    const timesStr = [
        "14:38:00 10.09.2023", "08:01:18 03.11.2023", "18:25:55 12.11.2023",
        "11:40:00 24.12.2023", "13:24:06 25.12.2023", "14:43:13 03.01.2024"
    ];
    const nums = [5398935, 7592002, 9560065, 11530326, 11578485, 11938905];
    return [timesStr.map(toUnixTimeStamp), nums];
}

function xiaomiSmsDec() {
    return chomp(xiaomiSms(), 2);
}

function smsIphone() {
    return [
        ["27.08.2023 16:31:07", "18.11.2023 18:17:02", "23.11.2023 21:13:30", "24.11.2023 15:48:13",
            "29.11.2023 20:58:17", "29.11.2023 23:24:45", "02.12.2023 14:43:38", "06.12.2023 21:09:38",
            "24.12.2023 18:57:45"],
        [3662458, 9875591, 10108091, 10137311, 10388703, 10390677, 10526383, 10741034, 11541941]
    ];
}

function late() {
    return merge(vicaApp, () => chomp(smsIphoneDates(), 1), () => chomp(xiaomiSms(), 2));
}

function late2() {
    return merge(screen2, screen3, screen4, () => chomp(smsIphoneDates(), 9));
}

function all() {
    return merge(smsIphoneDates, xiaomiSms, screen0, screen1, screen2, screen3, screen4);
}

function lastPointArr(ind, arr) {
    const [times, nums] = arr;
    const lastNum = nums[nums.length - 1 - ind];
    const lastTime = times[times.length - 1 - ind];
    return [lastTime, lastNum];
}

function pointFromArr(ind, arr) {
    const [times, nums] = arr;
    const lastNum = nums[ind];
    const lastTime = times[ind];
    return [lastTime, lastNum];
}

function lastPoint(ind) {
    return lastPointArr(ind, all());
}

const allWithoutFirstAndLast = () => chomp(chomp(all(), 1), -1);
const  allWithoutFirst = () => chomp(all(), 1);
const allWithoutLast = () => chomp(all(), -1);


function minus90(str) {
    const date = DateTime.fromFormat(str, "dd.LL.yyyy HH:mm:ss", { zone: "Europe/Belgrade" });
    const prevDate = date.plus({minutes: -90});
    return prevDate.toUnixInteger();
}

function smsIphoneDates() {
    const [timesStr, nums] = smsIphone();
    const times = timesStr.map(minus90);
    return [times, nums];
}

function merge() {
    let timesStr = [];
    let nums = [];
    for (let i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] === "function") {
            const [timesStr1, nums1] = arguments[i]();
            timesStr = timesStr.concat(timesStr1);
            nums = nums.concat(nums1);
        }
    }
    return [timesStr, nums];
}

const allFunctions = [
    screen0,
    screen1,
    screen2,
    screen3,
    screen4,
    smsIphoneDates,
    xiaomiSms,
    xiaomiSmsDec,
    vicaApp,
    allWithoutFirst,
    allWithoutLast,
    allWithoutFirstAndLast,
    all,
    late,
    late2
];

test("validLenAndType", () => {
    for (const dataFunc of allFunctions) {
        const [times, nums] = dataFunc();
        assert.equal(times.length, nums.length);
        for (let i = 0; i < times.length; ++i) {
            assert.equal(typeof times[i], "number");
            assert.equal(typeof nums[i], "number");
        }
    }
});

test("toUnixTimeStamp", () => {
    const dateStr = "17:54:28 24.01.2024";
    const tt = toUnixTimeStamp(dateStr);
    const result = 1706115268;
    assert.equal(result, tt);
});

function compare(dataFunc, d, needLog) {
    assert.equal(typeof dataFunc, "function");
    const [times, nums] = dataFunc();
    assert.equal(times.length, nums.length);
    const ans1 = findLineByLeastSquares(times, nums);
    const ans2 = updateFormula(arraysToObjects(times, nums));
    const res1 = numPrediction(ans1, d);
    const res2 = numPrediction(ans2, d);
    const diff = res1 - res2;
    if (needLog) {
        console.log("compare", ans1, res1, {dataFunc});
    }
    assert.ok(Math.abs(diff) < 2);
    // assert.equal(res1, res2);
    return res1;
}

function checkErrorSmall(d, num, threshold) {
    return (f) => {
        const res = f(d);
        const diff = res - num;
        const percent = diff * 100 / num;
        assert.ok(Math.abs(percent) < threshold, `${percent} ${threshold} ${f}`);
        return res;
    };
}

test("find_coeff", () => {
    const d = 1706115268;
    const num = 12847765;
    const checker = checkErrorSmall(d, num, 0.35);
    checker((d) => compare(screen3, d));
});

test("find_coeff2", () => {
    const d = new Date().getTime()/1000;
    for (const f of allFunctions) {
        compare(f, d, true);
    }
});

test("find_coeff3", () => {
    const [d, num] = lastPoint(0);
    const f = checkErrorSmall(d, num, 0.5);
    const functionToCalc = [late, late2].map(func => (d) => compare(func, d));
    const functionsToCheck = [...functionToCalc, approx2Formula, approx3Formula];
    const results = functionsToCheck.map(func => f(func));
    const diff = results.map(res => num - res);
    console.log("find_coeff3", results, diff);
});

test("find_coeff4", () => {
    const [d, num] = lastPointArr(0, screen3());
    const f = checkErrorSmall(d, num, 0.3);
    const functionToCalc = [late, late2].map(func => (d) => compare(func, d));
    const functionsToCheck = [...functionToCalc, approx1Formula, approx2Formula, approx3Formula];
    const results = functionsToCheck.map(func => f(func));
    const diff = results.map(res => num - res);
    console.log("find_coeff4", diff);
});

test("find_coeff5", () => {
    const d = 1706115268;
    const num = 12847765;
    const checker = checkErrorSmall(d, num, 2);
    for (const f of [screen3, vicaApp, xiaomiSmsDec, late, late2,
        allWithoutFirstAndLast,
        allWithoutFirst
    ]) {
        checker((d) => compare(f, d));
    }
});

function slope(f, ind1, ind2) {
    const [dBeg, numBeg] = pointFromArr(ind1, f);
    const [dEnd, numEnd] = lastPointArr(ind2, f);
    const slope1 = (numEnd - numBeg) / (dEnd - dBeg);
    return slope1;
}

test("find_slope", () => {
    const arr = merge(smsIphoneDates, screen3);
    const slope1 = slope(arr, 0, 0);
    const slope2 = slope(arr, 1, 0);
    const slope3 = slope(arr, 1, 1);

    const arr2 = all();
    const slope4 = slope(arr2, 0, 0);
    const slope5 = slope(arr2, 1, 0);
    const slope6 = slope(arr2, 1, 1);
    console.log("find_slope", slope1, slope2, slope3, slope4, slope5, slope6);
});

test("find_coeff7", () => {
    const [d, num] = lastPoint(1);
    const f = checkErrorSmall(d, num, 1);
    const functionToCalc = [late, late2].map(func => (d) => compare(func, d));
    const functionsToCheck = [...functionToCalc, approx1Formula, approx2Formula, approx3Formula];
    const results = functionsToCheck.map(func => f(func));
    const diff = results.map(res => num - res);
    console.log("find_coeff7", diff);
});

test("find_coeff8", () => {
    const [d, num] = lastPoint(0);
    const f = checkErrorSmall(d, num, 0.5);
    let i = 0;
    const functionToCalc = [late, late2].map(func => (d) => compare(func, d));
    const functionsToCheck = [...functionToCalc, approx2Formula, approx3Formula];
    for (const func of functionsToCheck) {
        const res = f(func);
        const diff = res - num;
        const percent = diff * 100 / num;
        console.log("find_coeff8", num - res, {func}, num, res, i, percent);
        ++i;
    }
});

test("find_coeff_all", () => {
    const [d, num] = lastPoint(0);
    const f = checkErrorSmall(d, num, 2.8);
    let i = 0;
    for (const func of [all, allWithoutFirst, allWithoutLast, allWithoutFirstAndLast]) {
        const res = f((d) => compare(func, d));
        const diff = res - num;
        const percent = diff * 100 / num;
        console.log("find_coeff_all", num - res, {func}, num, res, i, percent);
        ++i;
    }
});
