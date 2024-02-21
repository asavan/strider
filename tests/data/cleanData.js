import iphoneObj from "./cleanIphone.js";
import xiaomiObj from "./cleanXiaomi.js";
import vicaObj from "./cleanVicaApp.js";
import arrObj from "../utils/arrayUtils.js";

function screenJan() {
    return arrObj.merge(vicaObj.screen1, vicaObj.screen2, vicaObj.screen3);
}

function allFeb() {
    return vicaObj.screenFeb();
}

function vicaApp() {
    return arrObj.chomp(arrObj.merge(vicaObj.screenDec, screenJan, vicaObj.screenFeb), -1);
}

function allJan() {
    return arrObj.merge(xiaomiObj.xiaomiSmsJan, screenJan);
}

function all2024() {
    return arrObj.merge(allJan, allFeb);
}

function allBegin() {
    return arrObj.merge(iphoneObj.smsIphoneAug, xiaomiObj.xiaomiSmsSep);
}

function allNov() {
    return arrObj.merge(xiaomiObj.xiaomiSmsNov, iphoneObj.smsIphoneNov);
}

function allDec() {
    return arrObj.sortArr(arrObj.merge(iphoneObj.smsIphoneDec, xiaomiObj.xiaomiSmsDec, vicaObj.screenDec));
}

function allSinceNovWithoutLast() {
    return arrObj.chomp(arrObj.merge(allNov, allDec, allJan, allFeb), 1);
}

function late2() {
    return arrObj.merge(vicaObj.screen3, vicaObj.screenFeb);
}

function late3() {
    return lastK(13);
}

function all() {
    return arrObj.merge(allBegin, allNov, allDec, allJan, allFeb);
}

const allWithoutFirst = () => arrObj.chomp(all(), 1);
const allWithoutFirstAndLast = () => arrObj.chomp(allWithoutFirst(), -1);

function lastK(k) {
    return arrObj.lastK(all(), k);
}

function lastPoint(ind) {
    return arrObj.lastPointArr(ind, all());
}

const allFunctions = [
//    allBegin,
//    allNov,
    allDec,
    allJan,
    allFeb,
    all2024,
    vicaApp,
    all,
    allWithoutFirst,
    allWithoutFirstAndLast,
    allSinceNovWithoutLast,
    late2,
    late3
];

export default {
    allFunctions,
    late2, allSinceNovWithoutLast, all2024,
    allWithoutFirst, allWithoutFirstAndLast, all,
    lastPoint, lastK, allBegin, late3
};
