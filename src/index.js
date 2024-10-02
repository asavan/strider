"use strict";
import main from "./js/main.js";


if (__USE_SERVICE_WORKERS__) {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js", {scope: "./"});
    }
}

main(window, document);
