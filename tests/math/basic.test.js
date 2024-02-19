import test from "node:test";
import assert from "node:assert/strict";

import compObj from "./computation.js";
import dataObj from "../data/cleanData.js";
import vicaObj from "../data/cleanVicaApp.js";
import arrObj from "../utils/arrayUtils.js";


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
        assert.ok(Math.abs(percent) < thresholdPercent, `${percent} ${thresholdPercent} ${f}`);
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
            assert.ok(times[i] > prevTime, `${times[i]}, ${prevTime}, ${nums[i]}, ${prevNum}, ${dataFunc}`);
            assert.ok(nums[i] > prevNum, `${times[i]}, ${prevTime}, ${nums[i]}, ${prevNum}, ${dataFunc}`);
            prevTime = times[i];
            prevNum = nums[i];
        }
    }
});

test("slope", () => {
    for (const dataFunc of dataObj.allFunctions) {
        const slope = compObj.slope(dataFunc(), 0, 0);
        console.log("slope", slope, dataFunc);
    }
});

test("find_coeff", () => {
    const funcToTest = vicaObj.screen3;
    const [d, num] = arrObj.lastPointArr(0, funcToTest());
    const checker = checkErrorSmall(d, num, 0.35);
    checker(compObj.regressByFunc(funcToTest));
});

test("results_now", () => {
    const d = new Date().getTime()/1000;
    const functionToCalc = dataObj.allFunctions.map(f => compObj.regressByFunc(f, true));
    const functionsToCheck = [...functionToCalc, compObj.approx2Formula, compObj.approx3Formula, compObj.approx4Formula];
    const results = functionsToCheck.map(f => f(d));
    console.log("results_now", results);
});

test("lastTwoKnownPoints", () => {
    const functionToCalc = [dataObj.late2, dataObj.all2024, dataObj.allSinceNovWithoutLast, dataObj.allWithoutFirst,
        dataObj.allWithoutFirstAndLast, dataObj.all];
    const maxErrors = [0.3, 0.5, 0.8, 1.6, 1.8, 3];
    for (let i = 0; i < 2; ++i) {
        const [d, num] = dataObj.lastPoint(i);
        const results = functionToCalc.map((f, ind) => {
            const checker = checkErrorSmall(d, num, maxErrors[ind]);
            return checker(compObj.regressByFunc(f));
        });
        const diff = results.map(res => num - res);
        console.log("lastTwoKnownPoints", results, diff);
    }
});

test("approxFormula", () => {
    const maxError = 0.3;
    const functionsToCheck = [compObj.approx2Formula, compObj.approx3Formula, compObj.approx4Formula];
    for (let i = 0; i < 2; ++i) {
        const [d, num] = dataObj.lastPoint(i);
        const checker = checkErrorSmall(d, num, maxError);
        const results = functionsToCheck.map(checker);
        const diff = results.map(res => num - res);
        const percents = results.map(res => {
            const diff1 = res - num;
            const percent = diff1 * 100 / num;
            return percent;
        });
        console.log("approxFormula", diff, percents);
    }
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
