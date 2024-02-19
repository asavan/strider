import test from "node:test";
import assert from "node:assert/strict";



import mathObj from "./math.js";
import dataObj from "../data/cleanData.js";
import vicaObj from "../data/cleanVicaApp.js";
import arrObj from "../utils/arrayUtils.js";


function approx2Formula(date) {
    const diff2 = -840070000;
    return mathObj.numPrediction([0.5, diff2], date);
}

function approx3Formula(date) {
    const x = 0.59364;
    return mathObj.numPrediction([x, -1000000000], date);
}

function approx4Formula(date) {
    const x = 0.509;
    return mathObj.numPrediction([x, -855450000], date);
}

function lastPoint(ind) {
    return arrObj.lastPointArr(ind, dataObj.all());
}

function compare(dataFunc, d, needLog) {
    assert.equal(typeof dataFunc, "function");
    const [times, nums] = dataFunc();
    assert.equal(times.length, nums.length);
    const ans1 = mathObj.findLineByLeastSquares(times, nums);
    const ans2 = mathObj.updateFormula(arrObj.arraysToObjects(times, nums));
    const res1 = mathObj.numPrediction(ans1, d);
    const res2 = mathObj.numPrediction(ans2, d);
    const diff = res1 - res2;
    if (needLog) {
        console.log("compare", ans1, res1, ans2, res2, {dataFunc});
    }
    assert.ok(Math.abs(diff) < 2, `diff ${diff}, ${JSON.stringify({dataFunc})}`);
    // assert.equal(res1, res2);
    return res1;
}

function regressByFunc(dataFunc) {
    const [times, nums] = dataFunc();
    const ans1 = mathObj.findLineByLeastSquares(times, nums);
    return (d) => mathObj.numPrediction(ans1, d);
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

function slope(f, ind1, ind2) {
    const [dBeg, numBeg] = arrObj.pointFromArr(ind1, f);
    const [dEnd, numEnd] = arrObj.lastPointArr(ind2, f);
    const slope1 = (numEnd - numBeg) / (dEnd - dBeg);
    return slope1;
}

test("validLenAndType", () => {
    for (const dataFunc of dataObj.allFunctions) {
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



test("find_coeff", () => {
    const funcToTest = vicaObj.screen3;
    const [d, num] = arrObj.lastPointArr(0, funcToTest());
    const checker = checkErrorSmall(d, num, 0.35);
    checker(regressByFunc(funcToTest));
});

test("find_coeff2", () => {
    const d = new Date().getTime()/1000;
    for (const f of dataObj.allFunctions) {
        compare(f, d, true);
    }
});

test("regressByFunc", () => {
    const functionToCalc = [dataObj.late2, dataObj.late, dataObj.all2024, dataObj.allWithoutFirst, dataObj.allWithoutFirstAndLast, dataObj.all];
    const maxErrors = [0.3, 0.8, 0.5, 1.6, 1.8, 3];
    for (let i = 0; i < 2; ++i) {
        const [d, num] = lastPoint(i);
        const results = functionToCalc.map((f, ind) => {
            const checker = checkErrorSmall(d, num, maxErrors[ind]);
            return checker(regressByFunc(f));
        });
        const diff = results.map(res => num - res);
        console.log("regressByFunc", results, diff);
    }
});

test("approxFormula", () => {
    const maxError = 0.3;
    const functionsToCheck = [approx2Formula, approx3Formula, approx4Formula];
    for (let i = 0; i < 2; ++i) {
        const [d, num] = lastPoint(i);
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

test("find_coeff5", () => {
    const d = 1706115268;
    const num = 12847765;
    const checker = checkErrorSmall(d, num, 2);
    for (const f of dataObj.allFunctions) {
        checker((d) => compare(f, d));
    }
});


test("find_slope", () => {
    const arr2 = dataObj.all();
    const slope4 = slope(arr2, 0, 0);
    const slope5 = slope(arr2, 1, 0);
    const slope6 = slope(arr2, 1, 1);
    console.log("find_slope", slope4, slope5, slope6);
});
