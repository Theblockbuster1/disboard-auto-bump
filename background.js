var version = "3.7.2";

chrome.contextMenus.create({
  title: "Stop auto-bumping this tab",
  contexts: ["page"],
  documentUrlPatterns: ["*://disboard.org/*dashboard/servers", "*://disboard.org/*dashboard/servers/", "*://disboard.org/*dashboard/servers?*", "*://disboard.org/*dashboard/servers/?"],
  onclick: (_,tab) => chrome.tabs.executeScript(tab.id, {file: "clear_guild.js"})
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

function checkUpdates(){
  fetch('https://raw.githubusercontent.com/Theblockbuster1/disboard-auto-bump/master/manifest.json', {mode: 'cors'})
  .then(function(response) {
    if (response.ok) return response.text()
    else throw response.status+' - '+response.statusText
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
      }
  })
  .catch(function(error) {
    console.error('An error occured while checking for update: '+error);
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['safetymode'], function(data) {
    if (data.safetymode == undefined) chrome.storage.sync.set({safetymode:true});
  });
  checkUpdates();
});

setInterval(function () {
  chrome.storage.sync.get(['updates'], function(data) {
    if (data.updates == true) checkUpdates();
  });
}, 21600000);

chrome.notifications.onClicked.addListener(function(id) {
  chrome.tabs.create({url: "https://github.com/Theblockbuster1/disboard-auto-bump"});
  chrome.notifications.clear(id);
});

chrome.tabs.query({
  url: ["*://disboard.org/*dashboard/servers", "*://disboard.org/*dashboard/servers/", "*://disboard.org/*dashboard/servers?*", "*://disboard.org/*dashboard/servers/?"]
}, function(tabs) {
  tabs.forEach(tab => {
    chrome.tabs.update(tab.id,{autoDiscardable:false});
  });
});

chrome.tabs.onUpdated.addListener({
  url: ["*://disboard.org/*dashboard/servers", "*://disboard.org/*dashboard/servers/", "*://disboard.org/*dashboard/servers?*", "*://disboard.org/*dashboard/servers/?"]
}, function(tabId, changeInfo) {
  if (changeInfo.autoDiscardable == true) chrome.tabs.update(tabId,{autoDiscardable:false});
});

chrome.runtime.onMessage.addListener(function(message, sender) {
  if(message.closeThis) chrome.tabs.remove(sender.tab.id);
});