import templateFunc from "./template.js";

function addMinutes(date, diff) {
    return new Date(date.getTime() + diff*60000);
}

function setTime(date, time) {
    const d = new Date(date.getTime());
    const len = time.length;
    const hourPart = time.substring(0, len-2);
    const minutePart = time.substring(len-2);
    const hours = Number.parseInt(hourPart);
    const minute = Number.parseInt(minutePart);
    d.setHours(hours, minute);
    return d;
}

function nextDate(date) {
    const tomorrow = new Date(date.getTime());
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    return tomorrow;
}

function numPrediction(slope, b, x) {
    return Math.floor(slope * x + b);
}

function calcNum(date) {
    return numPrediction(0.59353, -1000000000, date.getTime()/1000);
}

export default function emulator() {
    const templater = templateFunc();
    const C1 = (date) => templater.C1(nextDate(date), calcNum(date));
    const A90 = (date) => templater.A90(addMinutes(date, 90), calcNum(date));
    const C90 = (date) => templater.C90(addMinutes(date, 90), calcNum(date));
    const C1Custom = (date, num) => templater.C1(nextDate(date), num);
    const Unknown = () => templater.Unknown();
    return {A90, C90, C1, C1Custom, Unknown, addMinutes, setTime};
}
