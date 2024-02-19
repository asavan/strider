import mathObj from "./math.js";
import arrObj from "../utils/arrayUtils.js";

function regressByFunc(dataFunc, needLog) {
    const [times, nums] = dataFunc();
    const ans1 = mathObj.findLineByLeastSquares(times, nums);
    if (needLog) {
        console.log("regressByFunc", ans1, dataFunc);
    }
    return (d) => mathObj.numPrediction(ans1, d);
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

export default {
    regressByFunc,
    regressByFunc2,
    slope,
    approx2Formula,
    approx3Formula,
    approx4Formula
};
