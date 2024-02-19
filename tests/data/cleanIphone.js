import arrObj from "../utils/arrayUtils.js";
import dateObj from "../utils/dateUtils.js";
import iphoneObj from "./dataIphone.js";

const iPhoneConv = arrObj.transformTimeFunc(dateObj.minus90);

export default {
    smsIphoneAug: iPhoneConv(iphoneObj.smsIphoneAug),
    smsIphoneNov: iPhoneConv(iphoneObj.smsIphoneNov),
    smsIphoneDec: iPhoneConv(iphoneObj.smsIphoneDec)
};
