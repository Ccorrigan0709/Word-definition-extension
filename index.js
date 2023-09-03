function setup() {
    noCanvas();
    let params = {
        active: true,
        currentWindow: true,
    }
    chrome.tabs.query(params, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action:'getVariable' }, function (response) {
            if (response && response.word) {
                const myVar = response.word.text;
                console.log("receieved variable");
                let myVariable = myVar.toLowerCase(); 
                let url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + myVariable 
                //createP(myVar);
                url = url.replace(/\s+/g, "");
                console.log(url); 
                loadJSON(url, function(data) {
                    const firstEntry = data[0]; // Access the first element of the array
                    if (firstEntry && firstEntry.meanings && firstEntry.meanings.length > 0) {
                      const firstMeaning = firstEntry.meanings[0];
                      if (firstMeaning.definitions && firstMeaning.definitions.length > 0) {
                        const firstDefinition = firstMeaning.definitions[0].definition;
                        createP(firstDefinition);
                      } else {
                        console.error("Error: No definitions found in the API response");
                      }
                    } else {
                      console.error("Error: Invalid or empty response from the API");
                    }
                  });
            }
        }); 
    }); 
}




// function setup() {
//     noCanvas();
//     chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//         console.log("fuck you"); 
//         if (message.from === "index") {
//             createCanvas(200, 100).parent('canvas-container');
//             createP(message.text);
//         }
//     }); 
// } 
