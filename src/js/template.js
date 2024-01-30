function serbianDate(date) {
    const timeZone = "Europe/Belgrade";
    const str = date.toLocaleDateString("ru-RU", { timeZone: timeZone });
    return str;
}

function serbianDateTime(date) {
    const timeZone = "Europe/Belgrade";
    const str = date.toLocaleString("ru-RU", { timeZone: timeZone });
    return str;
}

function makeC1Text(date, num) {
    return "U Beogradu, za broj telefona 381612655xxx, ste kupili DNEVNU KARTU U ZONI C(AB) po ceni od 150 din + osnovna cena poruke, koja vazi do " + serbianDate(date) +" 00:00:00. \n" +
 "Karta broj: 00" + num + ". \n" +
 "Placanjem operateru izmirujete dugovanja za ovu kartu prema JKP Naplata prevozne usluge Beograd. Sacuvajte ovu poruku.";
}

function makeA90Text(date, num) {
    return "U Beogradu, za broj telefona 381612655xxx, ste kupili VREMENSKU KARTU OD 90 MINUTA U ZONI A po ceni od 50 din + osnovna cena poruke, koja vazi do " + serbianDateTime(date) +".\n" +
            "Karta broj: 00" + num + ". \n" +
            "Placanjem operateru izmirujete dugovanja za ovu kartu prema JKP Naplata prevozne usluge Beograd. Sacuvajte ovu poruku.";
}

export default function templater() {
    return {C1: makeC1Text, A90: makeA90Text};
}
