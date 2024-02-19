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

function approx2Formula(date) {
    const diff2 = -840070000;
    return numPrediction([0.5, diff2], date);
}

function approx3Formula(date) {
    const x = 0.59363;
    return numPrediction([x, -1000000000], date);
}

function approx4Formula(date) {
    const x = 0.509;
    return numPrediction([x, -855450000], date);
}

function screenDec() {
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

function screenJan() {
    return merge(screen1, screen2, screen3);
}

function screenFeb() {
    const timesStr = ["18:56:55 01.02.2024", "20:48:23 01.02.2024", "18:00:00 13.02.2024", "16:39:16 17.02.2024"];
    const nums = [13278962, 13281432, 13883096, 14019026];
    return [timesStr.map(toUnixTimeStamp), nums];
}

function vicaApp() {
    return chomp(merge(screenDec, screenJan, screenFeb), -1);
}

function allJan() {
    return merge(xiaomiSmsJan, screenJan);
}

function all2024() {
    return merge(allJan, screenFeb);
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


function xiaomiSmsSep() {
    const timesStr = ["14:38:00 10.09.2023"];
    const nums = [5398935];
    return [timesStr.map(toUnixTimeStamp), nums];
}

function xiaomiSmsNov() {
    const timesStr = ["08:01:18 03.11.2023", "18:25:55 12.11.2023"];
    const nums = [7592002, 9560065];
    return [timesStr.map(toUnixTimeStamp), nums];
}

function xiaomiSmsDec() {
    const timesStr = [
        "11:40:00 24.12.2023", "13:24:06 25.12.2023",
    ];
    const nums = [11530326, 11578485];
    return [timesStr.map(toUnixTimeStamp), nums];
}

function xiaomiSmsJan() {
    const timesStr = ["14:43:13 03.01.2024"];
    const nums = [11938905];
    return [timesStr.map(toUnixTimeStamp), nums];
}

function smsIphoneAug() {
    return [["27.08.2023 16:31:07"], [3662458]];
}

function smsIphoneNov() {
    return [["18.11.2023 18:17:02", "23.11.2023 21:13:30", "24.11.2023 15:48:13",
        "29.11.2023 20:58:17", "29.11.2023 23:24:45"],
    [9875591, 10108091, 10137311, 10388703, 10390677]
    ];
}

function smsIphoneDec() {
    return [
        ["02.12.2023 14:43:38", "06.12.2023 21:09:38", "24.12.2023 18:57:45"],
        [10526383, 10741034, 11541941]
    ];
}

function allBegin() {
    return merge(smsToDatesFunc(smsIphoneAug), xiaomiSmsSep);
}

function allNov() {
    return merge(xiaomiSmsNov, smsToDatesFunc(smsIphoneNov));
}

function sortArr(arr) {
    const [times, nums] = arr;
    const temp = times.map((el, i) => { return {time: el, num: nums[i]};});
    temp.sort((el1, el2) => el1.time - el2.time);
    const time2 = temp.map(el => el.time);
    const nums2 = temp.map(el => el.num);
    return [time2, nums2];
}

function allDec() {
    return sortArr(merge(smsToDatesFunc(smsIphoneDec), xiaomiSmsDec, screenDec));
}

function late() {
    return chomp(merge(allNov, allDec, allJan, screenFeb), 1);
}

function late2() {
    return merge(screen3, screenFeb);
}

function all() {
    return merge(allBegin, allNov, allDec, allJan, screenFeb);
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
// const allWithoutLast = () => chomp(all(), -1);


function minus90(str) {
    const date = DateTime.fromFormat(str, "dd.LL.yyyy HH:mm:ss", { zone: "Europe/Belgrade" });
    const prevDate = date.plus({minutes: -90});
    return prevDate.toUnixInteger();
}

function smsToDatesArr(arr) {
    const [timesStr, nums] = arr;
    const times = timesStr.map(minus90);
    return [times, nums];
}

function smsToDatesFunc(f) {
    return (arg) => smsToDatesArr(f(arg));
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
//    allBegin,
//    allNov,
    allDec,
    allJan,
    screenFeb,
    all2024,
    vicaApp,
    all,
    allWithoutFirst,
    allWithoutFirstAndLast,
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

test("ordered", () => {
    for (const dataFunc of allFunctions) {
        let prevTime = 0;
        let prevNum = 0;
        const arr = dataFunc();
        const [times, nums] = arr;
        assert.equal(times.length, nums.length);
        for (let i = 0; i < times.length; ++i) {
            assert.ok(times[i] > prevTime, `${times[i]}, ${prevTime}, ${nums[i]}, ${prevNum}, ${dataFunc}`);
            assert.ok(nums[i] > prevNum);
            prevTime = times[i];
            prevNum = nums[i];
        }
        const slope1 = slope(arr, 0, 0);
        console.log("slope", slope1, dataFunc);
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
        console.log("compare", ans1, res1, ans2, res2, {dataFunc});
    }
    assert.ok(Math.abs(diff) < 2, `diff ${diff}, ${JSON.stringify({dataFunc})}`);
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
    const [d, num] = lastPoint(0);
    const f = checkErrorSmall(d, num, 0.3);
    const functionToCalc = [late2].map(func => (d) => compare(func, d));
    const functionsToCheck = [...functionToCalc, approx2Formula, approx3Formula, approx4Formula];
    const results = functionsToCheck.map(func => f(func));
    const diff = results.map(res => num - res);
    console.log("find_coeff4", diff);
});

test("find_coeff5", () => {
    const d = 1706115268;
    const num = 12847765;
    const checker = checkErrorSmall(d, num, 2);
    for (const f of allFunctions) {
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
    const arr2 = all();
    const slope4 = slope(arr2, 0, 0);
    const slope5 = slope(arr2, 1, 0);
    const slope6 = slope(arr2, 1, 1);
    console.log("find_slope", slope4, slope5, slope6);
});

test("find_coeff7", () => {
    const [d, num] = lastPoint(1);
    const f = checkErrorSmall(d, num, 1);
    const functionToCalc = [late, late2].map(func => (d) => compare(func, d));
    const functionsToCheck = [...functionToCalc, approx2Formula, approx3Formula];
    const results = functionsToCheck.map(func => f(func));
    const diff = results.map(res => num - res);
    console.log("find_coeff7", diff);
});

test("find_coeff8", () => {
    const [d, num] = lastPoint(0);
    const f = checkErrorSmall(d, num, 0.5);
    let i = 0;
    const functionToCalc = [late, late2].map(func => (d) => compare(func, d));
    const functionsToCheck = [...functionToCalc, approx2Formula, approx3Formula, approx4Formula];
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
    const f = checkErrorSmall(d, num, 1.8);
    let i = 0;
    for (const func of [allWithoutFirst, allWithoutFirstAndLast]) {
        const res = f((d) => compare(func, d));
        const diff = res - num;
        const percent = diff * 100 / num;
        console.log("find_coeff_all", num - res, {func}, num, res, i, percent);
        ++i;
    }
});
