var version = "3.5.0";

document.title = "Disboard Auto Bump " + version;
document.querySelector('.version').innerHTML = '(' + version + ')';

var enabled = true;
var myButton = document.getElementById('toggle');

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

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

var enabledtwo = true;
var myButtontwo = document.getElementById('toggletwo');


chrome.storage.sync.get(['updates'], function(data) {
    if (data.updates == undefined) {
        chrome.storage.sync.set({updates:enabledtwo});
        window.location = window.location;
    };
    enabledtwo = !!data.updates;
    myButtontwo.checked = enabledtwo;
});

function compareVer(a, b) // https://stackoverflow.com/a/53387532/11037661
{
    //treat non-numerical characters as lower version
    //replacing them with a negative number based on charcode of each character
    function fix(s)
    {
        return "." + (s.toLowerCase().charCodeAt(0) - 2147483647) + ".";
    }
    a = ("" + a).replace(/[^0-9\.]/g, fix).split('.');
    b = ("" + b).replace(/[^0-9\.]/g, fix).split('.');
    var c = Math.max(a.length, b.length);
    for (var i = 0; i < c; i++)
    {
        //convert to integer the most efficient way
        a[i] = ~~a[i];
        b[i] = ~~b[i];
        if (a[i] > b[i])
            return 1;
        else if (a[i] < b[i])
            return -1;
    }
    return 0;
};

myButtontwo.onclick = () => {
    enabledtwo = !enabledtwo;
    chrome.storage.sync.set({updates:enabledtwo});
    if (enabledtwo) {
        fetch('https://raw.githubusercontent.com/Theblockbuster1/disboard-auto-bump/master/manifest.json', {mode: 'cors'})
        .then(function(response) {
          return response.text();
        })
        .then(function(text) {
            if(compareVer(JSON.parse(text).version, version) == 1) {
              chrome.notifications.create('', {
                title: 'Update available!',
                message: 'Click here to update.',
                contextMessage: 'https://github.com/Theblockbuster1/disboard-auto-bump',
                iconUrl: '/images/disboard-auto-bump-logo.png',
                requireInteraction: true,
                type: 'basic'
              });
            };
        })
        .catch(function(error) {
          console.error('Request failed', error)
        });
    };
};