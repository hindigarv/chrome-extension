const removeNukta = function (str) {
    return str.replace('क़', 'क')
        .replace('ख़', 'ख')
        .replace('ग़', 'ग')
        .replace('ज़', 'ज')
        .replace('ड़', 'ड')
        .replace('ढ़', 'ढ')
        .replace('फ़', 'फ')
        .replace("़", "");
};
String.prototype.removeNukta = function () {
    return removeNukta(this);
};

const find = (shabdakosha, str) => {
    str = str.trim()
    if (str === "") return [];

    const splitRe = new RegExp(/[\s\-\[\],। .?!#_*%"”“'‘’:;|~^&+=/<>{}()…॰०१२३४५६७८९0123456789]/gm);
    let tokens = str.split(splitRe)
        .map(token => token.trim())
        .filter(token => token !== "")
        .map(token => token.removeNukta());
    tokens = [...new Set(tokens)]
    return tokens
        .map(token => shabdakosha[token])
        .filter(shabda => shabda != null)
        .filter(shabda => typeof shabda == "object")
}

let shabdakosha = {};
chrome.runtime.sendMessage(
    {from: "content", subject: "getShabdakosha"},
    response => {
        shabdakosha = response;
        scan(document.body)
    }
)

const words = new Set();

const isTextNode = (node) => node.nodeType === Node.TEXT_NODE

const scan = (element) => {
    for (let node of element.childNodes) {
        if (isTextNode(node)) {
            for (let word of find(shabdakosha, node.nodeValue)) {
                words.add(word);
            }
        } else if (node.childNodes.length > 0) {
            scan(node);  // Not a text node or leaf, so check it's children
        }
    }
}

let observer = new MutationObserver(mutations => {
    for (let mutation of mutations) {
        for (let addedNode of mutation.addedNodes) {
            scan(addedNode)
        }
    }
    updateBadge()
});
observer.observe(document, {childList: true, subtree: true});

const updateBadge = () => {
    // console.log("in updateBadge() words.size = ", words.size)
    chrome.runtime.sendMessage({
        from: 'content',
        subject: 'showBadge',
        count: words.size
    });
}


// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if (msg.from === "popup" && msg.subject === "getWords") {
        response(Array.from(words))
    }
    // else if (msg.from === "popup" && msg.subject === "FindWord") {
    //     word = msg.word;
    //     window.find(word)
    // }
});