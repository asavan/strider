import arrObj from "../utils/arrayUtils.js";
import dateObj from "../utils/dateUtils.js";
import rawObj from "./vicaAppRaw.js";

const conv = arrObj.transformTimeFunc(dateObj.toUnixTimeStamp);

export default {
    screenDec: conv(rawObj.screenDec),
    screenJan: conv(() => arrObj.merge(...rawObj.screenJan)),
    allAfterFeb: conv(() => arrObj.merge(...rawObj.allAfterFeb))
};
