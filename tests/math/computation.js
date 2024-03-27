import mathObj from "./math.js";
import arrObj from "../utils/arrayUtils.js";

function regressByArr(arr, label) {
    const [times, nums] = arr;
    const ans1 = mathObj.findLineByLeastSquares(times, nums);
    if (label) {
        console.log("regressByArr", ans1, label);
    }
    return (d) => mathObj.numPrediction(ans1, d);
}

function findZero(arr) {
    const [times, nums] = arr;
    const coeff = mathObj.findLineByLeastSquares(times, nums);
    const timestamp = - (coeff[1]/ coeff[0]);
    const date = new Date(Math.floor(timestamp * 1000));
    console.log("findZero", date);
    return timestamp;
}

function regressByFunc(dataFunc, label) {
    return regressByArr(dataFunc(), label);
}

function regressByFunc2(dataFunc, needLog) {
    const [times, nums] = dataFunc();
    const ans1 = mathObj.updateFormula(arrObj.arraysToObjects(times, nums));
    if (needLog) {
        console.log("regressByFunc2", ans1, dataFunc);
    }
    return (d) => mathObj.numPrediction(ans1, d);
}

function slope(f, ind1, ind2) {
    const [dBeg, numBeg] = arrObj.pointFromArr(ind1, f);
    const [dEnd, numEnd] = arrObj.lastPointArr(ind2, f);
    const slope1 = (numEnd - numBeg) / (dEnd - dBeg);
    return slope1;
}

function approx3Formula(date) {
    const x = 0.59360;
    return mathObj.numPrediction([x, -1000000000], date);
}

function approx5Formula(date) {
    const x = 0.53;
    return mathObj.numPrediction([x, -891200000], date);
}

export default {
    regressByFunc,
    regressByFunc2,
    regressByArr,
    findZero,
    slope,
    approx3Formula,
    approx5Formula
};
