import settings from "./settings.js";

import loader from "./load_default.js";
import generate from "./generate_last_trip.js";
import interaction from "./interactive.js";


function stringToBoolean(string){
    switch (string.toLowerCase().trim()){
    case "true": case "yes": case "1": return true;
    case "false": case "no": case "0": case null: return false;
    default: return Boolean(string);
    }
}

function parseSettings(window, document, settings) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    for (const [key, value] of urlParams) {
        if (typeof settings[key] === "number") {
            settings[key] = parseInt(value, 10);
        } else if (typeof settings[key] === "boolean") {
            settings[key] = stringToBoolean(value);
        } else {
            settings[key] = value;
        }
    }
}

export default async function starter(window, document) {
    parseSettings(window, document, settings);
    const dataUrl = "./data/default_sms.json";
    await loader(window, document, dataUrl);
    generate(window, document, settings);
    interaction(window, document, settings);
}
