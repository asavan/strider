import arrObj from "../utils/arrayUtils.js";
import dateObj from "../utils/dateUtils.js";
import rawObj from "./xiaomiRaw.js";

const conv = arrObj.transformTimeFunc(dateObj.toUnixTimeStamp);

export default {
    xiaomiSmsSep: conv(rawObj.xiaomiSmsSep),
    xiaomiSmsNov: conv(rawObj.xiaomiSmsNov),
    xiaomiSmsDec: conv(rawObj.xiaomiSmsDec),
    xiaomiSmsJan: conv(rawObj.xiaomiSmsJan),
    xiaomiSmsNov24: conv(rawObj.xiaomiSmsNov24)
};
