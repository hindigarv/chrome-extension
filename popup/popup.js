const showWords = words => {
    if (words === undefined) {
        return
    }
    console.log("in popup.js words = ", words)
    document.getElementById('vs-sankhya').textContent = words.length
    let suchiTable = document.getElementById('vs-suchi-tbody')

    words.forEach((word, index) => {
        let row = suchiTable.insertRow(index)
        row.insertCell().innerText = index + 1

        let wordCell = row.insertCell()
        let wordNobr = document.createElement("nobr")
        wordCell.appendChild(wordNobr)
        wordNobr.appendChild(document.createTextNode(word.shabda))
        wordNobr.appendChild(document.createTextNode(" "))
        let searchIcon = document.createElement("a")
        searchIcon.innerText = "🔍"; // TODO adjust row width on show, it straches currently
        searchIcon.href = "#"
        searchIcon.style.display = "none"
        searchIcon.addEventListener("click", () => find(word.shabda));
        wordNobr.appendChild(searchIcon)
        
        row.insertCell().innerText = word.mool
        row.insertCell().innerHTML = `<nobr>${word.paryaya}</nobr>`

        row.addEventListener("mouseenter", () => searchIcon.style.display = "inline")
        row.addEventListener("mouseleave", () => searchIcon.style.display = "none")
    });

}


const find = (word) => {
    window.close()
    send({
        from: "popup",
        subject: "FindWord",
        word: word
    })
}

const sendToContentScript = (message, callback) => {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        chrome.tabs.sendMessage(
            tabs[0].id,
            message,
            callback
        );
    });
}

window.addEventListener('DOMContentLoaded', () => {
    sendToContentScript({ from: 'popup', subject: 'getWords' }, showWords);
});