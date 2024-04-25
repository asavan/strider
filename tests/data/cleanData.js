import iphoneObj from "./cleanIphone.js";
import xiaomiObj from "./cleanXiaomi.js";
import vicaObj from "./cleanVicaApp.js";
import arrObj from "../utils/arrayUtils.js";

function allNov() {
    return arrObj.merge(xiaomiObj.xiaomiSmsNov, iphoneObj.smsIphoneNov);
}

function allDec() {
    return arrObj.sortArr(arrObj.merge(iphoneObj.smsIphoneDec, xiaomiObj.xiaomiSmsDec, vicaObj.screenDec));
}

function screenJan() {
    return arrObj.merge(vicaObj.screen1, vicaObj.screen2, vicaObj.screen3);
}

function allJan() {
    return arrObj.merge(xiaomiObj.xiaomiSmsJan, screenJan);
}

function allFeb() {
    return arrObj.merge(vicaObj.screenFeb, vicaObj.screenFeb2);
}

function allMarch() {
    return arrObj.merge(vicaObj.screenMarch, vicaObj.screenMarch2, vicaObj.screenMarch3);
}

function allApril() {
    return arrObj.merge(vicaObj.screenApril);
}

function vicaApp() {
    return arrObj.chomp(arrObj.merge(vicaObj.screenDec, screenJan, allFeb, allMarch, allApril), -1);
}

function all2024() {
    return arrObj.merge(allJan, allFeb, allMarch, allApril);
}

function allBegin() {
    return arrObj.merge(iphoneObj.smsIphoneAug, xiaomiObj.xiaomiSmsSep);
}

function allSinceNov() {
    return arrObj.merge(allNov, allDec, all2024);
}

function allSinceNovWithoutLast() {
    return arrObj.chomp(allSinceNov(), 1);
}

function late2() {
    return arrObj.merge(allMarch, allApril);
}

function late3() {
    return lastK(13);
}

function all() {
    return arrObj.merge(allBegin, allNov, allDec, all2024);
}

const allWithoutFirst = () => arrObj.chomp(all(), 1);
const allWithoutFirstAndLast = () => arrObj.chomp(allWithoutFirst(), -1);

function lastK(k) {
    return arrObj.lastK(all(), k);
}

function lastPoint(ind) {
    return arrObj.lastPointArr(ind, all());
}

function normalizeAug(func) {
    const beginDate = Date.parse("2024-01-01T00:00:00Z") / 1000;
    return arrObj.transformTimeFunc(t => t - beginDate)(func);
}

const allFunctions = [
    allMarch,
    allApril,
    all2024,
    vicaApp,
    all,
    allWithoutFirst,
    allWithoutFirstAndLast,
    allSinceNovWithoutLast,
    allSinceNov,
    late2,
    late3
];

export default {
    allFunctions,
    allSinceNov, allSinceNovWithoutLast, all2024,
    allWithoutFirst, allWithoutFirstAndLast, all,
    lastPoint, lastK, allBegin, late3, normalizeAug
};
