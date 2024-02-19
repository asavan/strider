function screenDec() {
    const timesStr = [
        "12:07:45 17.12.2023", "13:25:03 25.12.2023", "16:52:34 25.12.2023",
        "18:27:47 28.12.2023", "19:59:10 28.12.2023"
    ];
    const nums = [11216758, 11578632, 11590838, 11783178, 11786318];
    return [timesStr, nums];
}

function screen1() {
    const timesStr = ["14:44:04 03.01.2024", "17:42:30 03.01.2024", "18:39:24 04.01.2024"];
    const nums = [11938989, 11947004, 11997135];
    return [timesStr, nums];
}

function screen2() {
    const timesStr = ["17:18:45 08.01.2024", "19:48:36 08.01.2024", "17:55:02 10.01.2024", "19:42:15 10.01.2024"];
    const nums = [12085619, 12088098, 12192883, 12196428];
    return [timesStr, nums];
}


function screen3() {
    const timesStr = ["17:53:12 13.01.2024", "18:52:02 22.01.2024", "20:42:14 22.01.2024", "17:54:28 24.01.2024"];
    const nums = [12323933, 12692567, 12694791, 12847765];
    return [timesStr, nums];
}

function screenFeb() {
    const timesStr = ["18:56:55 01.02.2024", "20:48:23 01.02.2024", "18:00:00 13.02.2024", "16:39:16 17.02.2024"];
    const nums = [13278962, 13281432, 13883096, 14019026];
    return [timesStr, nums];
}

export default {
    screenDec,
    screen1,
    screen2,
    screen3,
    screenFeb
}
