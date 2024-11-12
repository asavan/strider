import test from "node:test";
import assert from "node:assert/strict";

import compObj from "./computation.js";
import dataObj from "../data/cleanData.js";
import vicaObj from "../data/cleanVicaApp.js";
import arrObj from "../utils/arrayUtils.js";

import xiaomiObj from "../data/cleanXiaomi.js";

import dateObj from "../utils/dateUtils.js";


function compareFunc(f1, f2, arr, threshold) {
    for (const d of arr) {
        const res1 = f1(d);
        const res2 = f2(d);
        const diff = res1 - res2;
        assert.ok(Math.abs(diff) < threshold, `diff ${diff}, ${f1}`);
    }
}

function checkErrorSmall(d, num, thresholdPercent) {
    return (f) => {
        const res = f(d);
        const diff = res - num;
        const percent = diff * 100 / num;
        assert.ok(Math.abs(percent) < thresholdPercent, `${percent} ${thresholdPercent} ${dateObj.fromSeconds(d)} ${res} ${num} ${f}`);
        return res;
    };
}

test("validLenAndType", () => {
    for (const dataFunc of dataObj.allFunctions) {
        assert.equal(typeof dataFunc, "function");
        const [times, nums] = dataFunc();
        assert.equal(times.length, nums.length);
        for (let i = 0; i < times.length; ++i) {
            assert.equal(typeof times[i], "number");
            assert.equal(typeof nums[i], "number");
        }
    }
});

test("ordered", () => {
    for (const dataFunc of dataObj.allFunctions) {
        let prevTime = 0;
        let prevNum = 0;
        const [times, nums] = dataFunc();
        assert.equal(times.length, nums.length);
        for (let i = 0; i < times.length; ++i) {
            assert.ok(times[i] >= prevTime, `${times[i]}, ${prevTime}, ${nums[i]}, ${prevNum}, ${dataFunc}`);
            assert.ok(nums[i] >= prevNum, `${times[i]}, ${prevTime}, ${nums[i]}, ${prevNum}, ${dataFunc}`);
            prevTime = times[i];
            prevNum = nums[i];
        }
    }
});

test("lastPoint", () => {
    console.log("lastPoint", dataObj.lastPoint(0));
    const res = compObj.approx3Formula(dataObj.lastPoint(0)[0]);
    console.log("lastPoint33", res);
});

test("allSize", () => {
    console.log("allSize", dataObj.all()[0].length);
});

test("slope", () => {
    for (const dataFunc of dataObj.allFunctions) {
        const slope = compObj.slope(dataFunc(), 0, 0);
        console.log("slope", slope, dataFunc);
    }
});

test("find_coeff", () => {
    const funcToTest = vicaObj.screenDec;
    const [d, num] = arrObj.lastPointArr(0, funcToTest());
    const checker = checkErrorSmall(d, num, 0.35);
    checker(compObj.regressByFunc(funcToTest));
});

test("results_now", () => {
    const d = new Date().getTime()/1000;
    const functionToCalc = dataObj.allFunctions.map(f => compObj.regressByFunc(f, f.name));
    const functionsToCheck = [...functionToCalc, compObj.approx3Formula, compObj.approx5Formula];
    const results = functionsToCheck.map(f => f(d));
    console.log("results_now", results);
});

test("lastTwoKnownPoints", () => {
    const functionToCalc = [dataObj.late3, dataObj.all2024, dataObj.allSinceNovWithoutLast, dataObj.allWithoutFirst,
        dataObj.allWithoutFirstAndLast, dataObj.all];
    const maxErrors = [0.7, 1.4, 1.6, 1.6, 1.8, 2.3];

    for (let i = 0; i < 2; ++i) {
        const [d, num] = dataObj.lastPoint(i);
        const results = functionToCalc.map((f, ind) => {
            const checker = checkErrorSmall(d, num, maxErrors[ind]);
            return checker(compObj.regressByFunc(f));
        });
        const diff = results.map(res => num - res);
        const percents = results.map(res => {
            const diff1 = num - res;
            const percent = diff1 * 100 / num;
            return percent;
        });
        console.log("lastTwoKnownPoints", results, diff, percents, num);
    }
});

test("lastTwoKnownPoints2", () => {
    const allAug = dataObj.normalizeAug(dataObj.all)();
    const functionToCalc = [dataObj.late3, dataObj.all2024, dataObj.allSinceNovWithoutLast, dataObj.allSinceNov];
    const maxErrors = [0.7, 1.4, 1.6, 1.5];

    for (let i = 0; i < 2; ++i) {
        const [d, num] = arrObj.lastPointArr(i, allAug);
        const results = functionToCalc.map((f, ind) => {
            const checker = checkErrorSmall(d, num, maxErrors[ind]);
            return checker(compObj.regressByFunc(dataObj.normalizeAug(f), f.name));
        });
        const diff = results.map(res => num - res);
        const percents = results.map(res => {
            const diff1 = num - res;
            const percent = diff1 * 100 / num;
            return percent;
        });
        console.log("lastTwoKnownPoints2", results, diff, percents, num);
    }
});

function checkLastPoints(functionsToCheck, maxError, pointsCount, label) {
    for (let i = 0; i < pointsCount; ++i) {
        const [d, num] = dataObj.lastPoint(i);
        const checker = checkErrorSmall(d, num, maxError);
        const results = functionsToCheck.map(checker);
        const diff = results.map(res => num - res);
        const percents = results.map(res => {
            const diff1 = num - res;
            const percent = diff1 * 100 / num;
            return percent;
        });
        console.log(label, results, diff, percents);
    }
}

test("approxFormula", () => {
    const maxError = 0.3;
    const pointsCount = 3;
    const functionsToCheck = [compObj.approx3Formula];
    checkLastPoints(functionsToCheck, maxError, pointsCount, "approxFormula");
});

test("approxFormula_long", () => {
    const maxError = 2.6;
    const pointsCount = 65;
    const functionsToCheck = [compObj.approx3Formula];
    checkLastPoints(functionsToCheck, maxError, pointsCount, "approxFormula_long");
});

test("approxFormula_relax", () => {
    const maxError = 1.1;
    const pointsCount = 3;
    const functionsToCheck = [compObj.approx5Formula, compObj.approx3Formula];
    checkLastPoints(functionsToCheck, maxError, pointsCount, "approxFormula_relax");
});

test("correctMathAllPoints", () => {
    const times = dataObj.all()[0];
    for (const f of dataObj.allFunctions) {
        compareFunc(compObj.regressByFunc(f), compObj.regressByFunc2(f), times, 2);
    }
});

test("find_slope", () => {
    const arr2 = dataObj.all();
    const slope4 = compObj.slope(arr2, 0, 0);
    const slope5 = compObj.slope(arr2, 1, 0);
    const slope6 = compObj.slope(arr2, 1, 1);
    console.log("find_slope", slope4, slope5, slope6);
});

function toHours(len) {
    return Math.floor(len/60/60);
}

test("bestK", () => {
    const arr = dataObj.all();
    for (let t = 0; t < 20; ++t) {
        const lp = arrObj.lastPointArr(t, arr);
        const arrToLearn = arrObj.chomp(arr, -(t+1));
        let bestRes = 10000;
        let bestLen = 0;
        let bestK = 0;
        for (let k = 5; k < arrToLearn[0].length; ++k) {
            const lastKPoints = arrObj.lastK(arrToLearn, k);
            const f = compObj.regressByArr(lastKPoints);
            const res1 = f(lp[0]);
            const diff = lp[1] - res1;
            const diffAbs = Math.abs(diff);
            // console.log("bestK", res1, lp[1], diff, k);
            if (diffAbs < bestRes) {
                bestRes = diffAbs;
                bestK = k;
                bestLen = lastKPoints[0][k-1] - lastKPoints[0][0];
            }
        }
        console.log({bestK, bestRes, t, bestLen}, toHours(bestLen));
    }
});

test("bestK2", () => {
    const arr = dataObj.all();
    const arrToLearn = arrObj.chomp(arr, -1);
    for (let k = 5; k < arrToLearn[0].length; ++k) {
        const lastKPoints = arrObj.lastK(arrToLearn, k);
        compObj.regressByArr(lastKPoints, k);
    }
});

test("findZero", () => {
    const arrToLearn = arrObj.merge(dataObj.allBegin, xiaomiObj.xiaomiSmsNov);
    for (let k = 2; k <= arrToLearn[0].length; ++k) {
        const lastKPoints = arrObj.lastK(arrToLearn, -k);
        console.log("lastKPoints", lastKPoints[0], k);
        compObj.findZero(lastKPoints);
    }
});
