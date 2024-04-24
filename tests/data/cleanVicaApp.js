import arrObj from "../utils/arrayUtils.js";
import dateObj from "../utils/dateUtils.js";
import rawObj from "./vicaAppRaw.js";

const conv = arrObj.transformTimeFunc(dateObj.toUnixTimeStamp);

export default {
    screenDec: conv(rawObj.screenDec),
    screen1: conv(rawObj.screen1),
    screen2: conv(rawObj.screen2),
    screen3: conv(rawObj.screen3),
    screenFeb: conv(rawObj.screenFeb),
    screenFeb2: conv(rawObj.screenFeb2),
    screenMarch: conv(rawObj.screenMarch),
    screenMarch2: conv(rawObj.screenMarch2),
    screenMarch3: conv(rawObj.screenMarch3),
    screenApril: conv(rawObj.screenApril)
};
