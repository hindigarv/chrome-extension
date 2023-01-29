import {} from "./node_modules/nukta-remover/index.js";
import {generateValuesFromRegex} from "./node_modules/regex-val-gen/index.js";

const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTnYyZxqwSjM3IPG9TchbZcAUDNM_Y4zbZCFjimzQKVjQpNNinNRj4CeWzXaHDNcDEJ_EPOrtBLycRD/pub?gid=0&single=true&output=tsv";

class Word {
    constructor(shabda, mool, paryaya, roops, regex) {
        this.shabda = shabda;
        this.mool = mool;
        this.paryaya = paryaya;
        this.roops = roops;
        this.regex = regex;
    }
}

const toWord = (row) => {
    const shabda = row[0].trim().removeNukta();
    const mool = row[1].trim();
    const paryaya = row[2].trim();
    if ("शब्द" === shabda || shabda === "" || mool === "" || paryaya === "") {
        return null;
    }
    const roops = row[4].removeNukta().split(",").map(r => r.trim());
    const regex = row[5].trim();
    return new Word(shabda, mool, paryaya, roops, regex);
}

function getRoops(word) {
    let roops = word.roops;
    roops.push(word.shabda)
    generateValuesFromRegex(word.regex).forEach(v => roops.push(v))
    roops = roops.filter(roop => roop !== "")
    return [...new Set(roops)]
}

let shabdakosha = null;
let isShabdakoshaReady = false;

const initShabdakosha = (csvContent) => {
    let lines = csvContent.split("\r\n")
    lines.shift() // remove first (header) line
    shabdakosha = lines
        .map(line => line.split("\t"))
        .map(row => toWord(row))
        .filter(word => word != null)
        .reduce((acc, word) => {
            getRoops(word).forEach(roop => acc[roop] = word)
            return acc;
        }, {})
    console.log("shabdakosha is ready")
    isShabdakoshaReady = true;
}

fetch(url)
    .then(response => response.text())
    .then(text => initShabdakosha(text))


export {isShabdakoshaReady, shabdakosha}