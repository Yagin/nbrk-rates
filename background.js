function getSelection() {
	chrome.tabs.executeScript(null, {code: "chrome.extension.sendRequest(document.getSelection().toString())"});
}
