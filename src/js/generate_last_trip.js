import renderMessage from "./render.js";
import emulatorFunc from "./logic.js";


function c1Generate() {
    const emulator = emulatorFunc();
    const date = emulator.addMinutes(new Date(), -(2*60 + 15));
    const to = { text: "C1", date: date, direction: "to"};
    const from = { text: emulator.C1(date), date: date, direction: "from"};
    return {
        "name": "last_trip",
        "messages" : [to, from]
    };
}

function cleanStorage() {
    sessionStorage.removeItem("last_trip");
    console.log("erased");
}

function a90Generate() {
    const emulator = emulatorFunc();
    const date = emulator.addMinutes(new Date(), -23);
    const to = { text: "A90", date: date, direction: "to"};
    const from = { text: emulator.A90(date), date: date, direction: "from"};
    return {
        "name": "last_trip",
        "messages" : [to, from]
    };
}

function generateAndRender(document, list, genFunc) {
    const data = genFunc();
    for (const message of data.messages) {
        renderMessage(message, document, list);
    }
}

const a90GenAndRender =  (document, list) => generateAndRender(document, list, a90Generate);

function preventClick(document, list, f, ctr) {
    let count = 0;
    return (e) => {
        e.preventDefault();
        ++count;
        if (count < ctr) {
            return;
        }
        count = 0;
        f(document, list);
    };
}

function onBackClick(document, list) {
    return preventClick(document, list, a90GenAndRender, 5);
}

function onPlusClick(document, list) {
    return preventClick(document, list, cleanStorage, 5);
}

function getFromStorageOrGenerate(window) {
    const data = window.sessionStorage.getItem("last_trip");
    const now = new Date();
    if (data) {
        const parsedData = JSON.parse(data);
        const storageDate = new Date(Date.parse(parsedData.date));
        const emulator = emulatorFunc();
        if (emulator.addMinutes(storageDate, 24) > now) {
            return parsedData.data;
        }
    }
    const newInfo = c1Generate();
    const toSave = {data: newInfo, date: now};
    window.sessionStorage.setItem("last_trip", JSON.stringify(toSave));
    return newInfo;
}

export default async function generate(window, document) {
    const list = document.querySelector("main");
    generateAndRender(document, list, () => getFromStorageOrGenerate(window));
    {
        const backButton = document.querySelector(".left");
        const bClick = onBackClick(document, list);
        backButton.addEventListener("click", bClick);
    }
    {
        const plusButton = document.querySelector(".plus");
        const pClick = onPlusClick(document, list);
        plusButton.addEventListener("click", pClick);
    }
}
