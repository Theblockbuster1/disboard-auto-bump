var enabled = true;
var myButton = document.getElementById('toggle');


chrome.storage.sync.get(['safetymode'], function(data) {
    if (data.safetymode == undefined) {
        chrome.storage.sync.set({safetymode:enabled});
        window.location = window.location;
    };
    enabled = !!data.safetymode;
    myButton.checked = enabled;
});

myButton.onclick = () => {
    enabled = !enabled;
    chrome.storage.sync.set({safetymode:enabled});
};