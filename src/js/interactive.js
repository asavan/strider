import renderMessage from "./render.js";
import emulatorFunc from "./logic.js";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function router(text, dateInSms) {
    const emulator = emulatorFunc();
    switch (text) {
    case "A90":
        return emulator.A90(dateInSms);
    case "C1":
        return emulator.C1(dateInSms);
    case "C90":
        return emulator.C90(dateInSms);
    default:
        return emulator.Unknown();
    }
}

async function processNormal(text, list, input, document) {
    const date = new Date();
    const to = { text, date, direction: "to"};
    input.value = "";
    renderMessage(to, document, list);
    await delay(getRandomArbitrary(1000, 2000));
    const textFrom = router(text, date);
    const from = { text: textFrom, date: new Date(), direction: "from"};
    renderMessage(from, document, list);
}

function processNumber(text) {
    const num = parseInt(text.slice(2), 10);
    const emulator = emulatorFunc();
    const now = new Date();
    const date = emulator.addMinutes(now, -(2*60 + 15));

    const to = { text: "C1", date: date, direction: "to"};
    const from = { text: emulator.C1Custom(date, num), date: date, direction: "from"};
    const newInfo = {
        "name": "last_trip",
        "messages" : [to, from]
    };

    const toSave = {data: newInfo, date: now};
    window.sessionStorage.setItem("last_trip", JSON.stringify(toSave));
    window.location.reload();
}

function isValidNumber(text) {
    if (text.length < 10) {
        return false;
    }
    if (text[0] !== "0" || text[1] !== "0") {
        return false;
    }
    for (let i =0; i < text.length; ++i) {
        const symbol = text.charCodeAt(i);
        const asciiZero = 48; /* "0" */
        if (symbol < asciiZero  || symbol > (asciiZero + 9) ) {
            // not digit
            return false;
        }
    }
    return true;
}

function onSend(e, document) {
    e.preventDefault();
    const list = document.querySelector("main");
    const input = document.querySelector(".text-input");
    if (!input.value) {
        return;
    }
    const text = input.value;
    if (isValidNumber(text)) {
        return processNumber(text);
    }
    return processNormal(text, list, input, document);
}

export default function interaction(window, document) {
    const sendBtn = document.querySelector(".send");
    sendBtn.addEventListener("click", (e) => onSend(e, document));

    const input = document.querySelector(".text-input");
    input.addEventListener("input", (event) => {console.log("input cha", event);});
}
