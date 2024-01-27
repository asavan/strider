import renderMessage from "./render.js";

function addMinutes(date, diff) {
    return new Date(date.getTime() + diff*60000);
}

function formatDate(date) {
    const timeZone = "Europe/Belgrade";
    const str = date.toLocaleDateString("ru-RU", { timeZone: timeZone });
    return str;
}


function makeText(date, num) {
    return "U Beogradu, za broj telefona 381612655xxx, ste kupili DNEVNU KARTU U ZONI C(AB) po ceni od 150 din + osnovna cena poruke, koja vazi do " + formatDate(date) +" 00:00:00. \n" +
 "Karta broj: 00" + num + ". \n" +
 "Placanjem operateru izmirujete dugovanja za ovu kartu prema JKP Naplata prevozne usluge Beograd. Sacuvajte ovu poruku.";
}

function nextDate(date) {
    const tomorrow = new Date(date.getTime());
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    return tomorrow;
}

function calcNum(date) {
    const beginNum = 11530326;
    const beginDate = Date.parse("2023-12-25T14:13:04.000Z");
    const diff = date.getTime() - beginDate;
    const magic = 0.49195; // (12847765-11530326) / (31*24*60*60);
    const result = beginNum + Math.floor(magic * diff / 1000);
    console.log(beginDate, diff, magic, result);
    return result;
}

function generate_impl() {
    const date = addMinutes(new Date(), -10);
    const to = { text: "C1", date: date, direction: "to"};
    const from = { text: makeText(nextDate(date), calcNum(date)), date: date, direction: "from"};
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
