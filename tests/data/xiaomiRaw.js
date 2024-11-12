function xiaomiSmsSep() {
    return [["14:38:00 10.09.2023"], [5398935]];
}

function xiaomiSmsNov() {
    const timesStr = ["08:01:18 03.11.2023", "18:25:55 12.11.2023"];
    const nums = [7592002, 9560065];
    return [timesStr, nums];
}

function xiaomiSmsDec() {
    const timesStr = [
        "11:40:00 24.12.2023", "13:24:06 25.12.2023",
    ];
    const nums = [11530326, 11578485];
    return [timesStr, nums];
}

function xiaomiSmsJan() {
    const timesStr = ["14:43:13 03.01.2024"];
    const nums = [11938905];
    return [timesStr, nums];
}

function xiaomiSmsNov24() {
    const timesStr = ["12:54:00 10.11.2024"];
    const nums = [27508804];
    return [timesStr, nums];
}

export default {
    xiaomiSmsSep,
    xiaomiSmsNov,
    xiaomiSmsDec,
    xiaomiSmsJan,
    xiaomiSmsNov24
};
