function lastPointArr(ind, arr) {
    const [times, nums] = arr;
    const lastNum = nums[nums.length - 1 - ind];
    const lastTime = times[times.length - 1 - ind];
    return [lastTime, lastNum];
}

function pointFromArr(ind, arr) {
    const [times, nums] = arr;
    const lastNum = nums[ind];
    const lastTime = times[ind];
    return [lastTime, lastNum];
}

function transformTimeArr(arr, func) {
    const [timesStr, nums] = arr;
    const times = timesStr.map(func);
    return [times, nums];
}

function transformTimeFunc(transformFunc) {
    return (arrFunc) => (arg) => transformTimeArr(arrFunc(arg), transformFunc);
}

function sortArr(arr) {
    const [times, nums] = arr;
    const temp = times.map((el, i) => { return {time: el, num: nums[i]};});
    temp.sort((el1, el2) => el1.time - el2.time);
    const time2 = temp.map(el => el.time);
    const nums2 = temp.map(el => el.num);
    return [time2, nums2];
}

function chomp(arr, num) {
    const [times, nums] = arr;
    if (num > 0) {
        return [times.slice(num), nums.slice(num)];
    } else if (num < 0) {
        return [times.slice(0, num), nums.slice(0, num)];
    } else {
        console.error("No Chomp");
        return [...arr];
    }
}

function lastK(arr, k) {
    if (k === 0) {
        return [[], []];
    }

    const [times, nums] = arr;
    if (k > 0) {
        return [times.slice(-k), nums.slice(-k)];
    }
    return [times.slice(0, -k), nums.slice(0, -k)];
}

function merge() {
    let timesStr = [];
    let nums = [];
    for (let i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] === "function") {
            const [timesStr1, nums1] = arguments[i]();
            timesStr = timesStr.concat(timesStr1);
            nums = nums.concat(nums1);
        } else {
            console.error("Bad name", arguments[i]);
            throw new TypeError("Bad function");
        }
    }
    return [timesStr, nums];
}

function arraysToObjects(arr1, arr2) {
    const currentData = [];
    for (let i = 0; i < arr1.length; ++i) {
        currentData.push({ x: arr1[i], y: arr2[i] });
    }
    return currentData;
}

export default {
    lastPointArr,
    pointFromArr,
    transformTimeArr,
    transformTimeFunc,
    sortArr,
    arraysToObjects,
    merge,
    chomp,
    lastK
};
