function screenDec() {
    return [
        ["12:07:45 17.12.2023", "13:25:03 25.12.2023", "16:52:34 25.12.2023",
            "18:27:47 28.12.2023", "19:59:10 28.12.2023"],
        [11216758, 11578632, 11590838, 11783178, 11786318]
    ];
}

function screen1() {
    return [
        ["14:44:04 03.01.2024", "17:42:30 03.01.2024", "18:39:24 04.01.2024"],
        [11938989, 11947004, 11997135]
    ];
}

function screen2() {
    return [
        ["17:18:45 08.01.2024", "19:48:36 08.01.2024", "17:55:02 10.01.2024", "19:42:15 10.01.2024"],
        [12085619, 12088098, 12192883, 12196428]
    ];
}

function screen3() {
    return [
        ["17:53:12 13.01.2024", "18:52:02 22.01.2024", "20:42:14 22.01.2024", "17:54:28 24.01.2024"],
        [12323933, 12692567, 12694791, 12847765]
    ];
}

function screenFeb() {
    return [
        ["18:56:55 01.02.2024", "20:48:23 01.02.2024", "18:00:00 13.02.2024", "16:39:16 17.02.2024"],
        [13278962, 13281432, 13883096, 14019026]
    ];
}

function screenFeb2() {
    return [
        ["09:45:57 20.02.2024", "11:17:19 20.02.2024", "17:36:57 27.02.2024"],
        [14120058, 14125493, 14498505]
    ];
}

function screenMarch() {
    return [
        ["17:09:13 08.03.2024"],
        [15048773]
    ];
}

function screenMarch2() {
    return [
        ["17:45:43 11.03.2024", "19:29:29 11.03.2024", "18:01:09 14.03.2024", "11:35:56 16.03.2024"],
        [15167639, 15171637, 15342860, 15421122]
    ];
}

function screenMarch3() {
    return [
        ["11:58:37 17.03.2024", "16:44:35 17.03.2024", "16:55:36 23.03.2024", "20:03:24 23.03.2024"],
        [15447838, 15455848, 15806870, 15811876]
    ];
}

function screenApril() {
    return [
        ["07:59:34 09.04.2024", "13:43:40 11.04.2024", "20:09:46 18.04.2024", "18:45:09 20.04.2024"],
        [16675622, 16828294, 17205049, 17300086]
    ];
}

function screenJune() {
    return [
        ["09:13:38 02.06.2024"],
        [19306689]
    ];
}

const allAfterFeb = [
    screenFeb,
    screenFeb2,
    screenMarch,
    screenMarch2,
    screenMarch3,
    screenApril,
    screenJune
];

export default {
    screenDec,
    screen1,
    screen2,
    screen3,
    screenFeb,
    screenFeb2,
    screenMarch,
    screenMarch2,
    screenMarch3,
    screenApril,
    allAfterFeb
};
