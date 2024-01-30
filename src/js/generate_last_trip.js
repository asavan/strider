import renderMessage from "./render.js";
import templateFunc from "./template.js";

function addMinutes(date, diff) {
    return new Date(date.getTime() + diff*60000);
}


function nextDate(date) {
    const tomorrow = new Date(date.getTime());
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    return tomorrow;
}

function numPrediction(slope, b, x) {
    return Math.floor(slope * x + b);
}

function calcNum(date) {
    return numPrediction(0.5, -840200000, date.getTime()/1000);
}

function generate_impl() {
    const date = addMinutes(new Date(), -10);
    const templater = templateFunc();
    const to = { text: "C1", date: date, direction: "to"};
    const from = { text: templater.C1(nextDate(date), calcNum(date)), date: date, direction: "from"};
    return {
        "name": "last_trip",
        "messages" : [to, from]
    };
}

export default async function generate(window, document) {
    const list = document.querySelector("main");
    const data = generate_impl();
    for (const message of data.messages) {
        renderMessage(message, document, list);
        // console.log("data", message);
    }
}
