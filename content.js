console.log("test");

window.addEventListener('mouseup', wordSelected);
window.word = "balls";

function wordSelected() {
    console.log("word selected");
    let selectedText = window.getSelection().toString().trim();
    console.log(selectedText);
    if (selectedText.length>0) {
        word = {
            text: selectedText        
        };
    }
}

chrome.runtime.onMessage.addListener(varSend);
function varSend(message, sender, sendResponse) {
    if (message.action === 'getVariable') {
        sendResponse({word});
    }
}




