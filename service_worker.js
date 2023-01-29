import {shabdakosha} from "./hindigarv.js"

chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if (msg.from === "content" && msg.subject === "getShabdakosha") {
      response(shabdakosha);
    } else if (msg.from === "content" && msg.subject === "showBadge") {
        let text = msg.count > 0 ? msg.count.toString() : ""
        // TODO color code badge, based on number of digits, yellow, orange, red
        chrome.action.setBadgeText({
            tabId: sender.tab.id,
            text: text
        });
    }
});
