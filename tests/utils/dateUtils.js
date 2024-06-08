import { DateTime } from "luxon";

function toUnixTimeStamp(str) {
    const date = DateTime.fromFormat(str, "HH:mm:ss dd.LL.yyyy", { zone: "Europe/Belgrade" });
    if (!date.isValid) {
        const err = new Error("Bad date");
        err.info = {
            date: str,
            reason: date.invalidReason
        }
        throw err;
    }
    return date.toUnixInteger();
}

function minus90(str) {
    const date = DateTime.fromFormat(str, "dd.LL.yyyy HH:mm:ss", { zone: "Europe/Belgrade" });
    if (!date.isValid) {
        const err = new Error("Bad date");
        err.info = {
            date: str,
            reason: date.invalidReason
        }
        throw err;
    }
    const prevDate = date.plus({minutes: -90});
    return prevDate.toUnixInteger();
}

function fromSeconds(num) {
    const myDateTime = DateTime.fromSeconds(num);
    const myDateTimeISO = myDateTime.setZone("Europe/Belgrade").toFormat('dd.LL.yyyy HH:mm:ss');;
    return myDateTimeISO;
}

export default {
    toUnixTimeStamp,
    minus90,
    fromSeconds
};
