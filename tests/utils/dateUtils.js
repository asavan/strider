import { DateTime } from "luxon";

function toUnixTimeStamp(str) {
    const date = DateTime.fromFormat(str, "HH:mm:ss dd.LL.yyyy", { zone: "Europe/Belgrade" });
    return date.toUnixInteger();
}

function minus90(str) {
    const date = DateTime.fromFormat(str, "dd.LL.yyyy HH:mm:ss", { zone: "Europe/Belgrade" });
    const prevDate = date.plus({minutes: -90});
    return prevDate.toUnixInteger();
}

export default {
    toUnixTimeStamp,
    minus90
};
