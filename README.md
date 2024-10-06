# Disboard Auto Bump [3.8.0]

###### *By using this extension, you understand that your server could get banned off Disboard. Use this at your own risk.*

**Not against Discord's ToS!**

**This Browser Extension simply auto-bumps your Discord server on Disboard. Useful for easily gaining more members in your server!**

![Screenshot](https://i.imgur.com/geTxMkp.png)

# Install Instructions (Chrome)

Until I decide to pay the dev licence fee, this will be the way to install the extension.

1. Download (or clone) the repository and (if you downloaded) extract the folder into a directory.

![Download button](https://i.imgur.com/4LxWWS2.png)

2. Visit `chrome://extensions/` (copy this into the search bar) and enable Developer mode.

![Developer mode switch](https://i.imgur.com/EHnZ384.png)

3. Drag and drop the folder into `chrome://extensions/`.

![Drag and dropping](https://i.imgur.com/zg38IHc.png)

That's it!

# Install Instructions (Firefox)

1. Download (or clone) the repository and (if you downloaded) extract the folder into a directory.

![Download button](https://i.imgur.com/4LxWWS2.png)

2. Visit `about:debugging#/runtime/this-firefox` (copy this into the search bar).

3. Click on 'Load Temporary Add-on...' and locate the `manifest.json` file in the folder you extracted.

![Load Temporary Add-on...](https://i.imgur.com/LFz5v7t.png)

That's it! (You may have to reinstall the add-on on restarts)

# How to use

1. Go onto https://disboard.org/dashboard/servers.

2. Click on the 🅱️ icon to pick which server to bump in that tab.

3. Keep it open or it will not work. TIP: Pin the tab! (Right Click > "Pin Tab")

4. [Multibumping!] Optionally have multiple tabs opened for different servers!

# FAQ

**Q: Why does the extension randomly freeze or not bump?**

A: A work around to this issue (mentioned in [#4](https://github.com/Theblockbuster1/disboard-auto-bump/issues/4#issuecomment-680121784)) is to install [this auto refreshing extension](https://chrome.google.com/webstore/detail/tab-auto-reloader/knnahnemielbnanghaphjgheamgcjjcb) and run it along side.

**Q: Why doesn't the timer correspond with the time left to bump?**

A: This is to avoid being de-listed of Disboard and is normal. It can be disabled by switching off Safety Mode in the extension popup.

**Q: Why do I get a message telling me that this is unsafe?**

A: The warning "Disable developer mode extensions" is displayed in Chrome when you install non Chrome Web Store extensions in the browser. Read more and learn how to disable it [here](https://www.ghacks.net/2017/07/04/hide-chromes-disable-developer-mode-extensions-warning/). If you would like to continue using the extension then simply press 'X' when you see this message.

!["Disable developer mode extensions"](https://i.imgur.com/y2KiC8s.png)

**Q: Why do I get an error saying "Unrecognized manifest key 'browser_specific_settings'."**

A: In Chrome, if you look into the errors of the extension, you may find this error. It is completely normal and the extension will still continue to function properly. The reason for this error is that `browser_specific_settings` is used for Firefox add-on support but Chrome doesn't recognize this.

![Unrecognized manifest key 'browser_specific_settings'.](https://i.imgur.com/L1j0cEn.png)

**Q: IT STILL DOESN'T WORK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!???**

A: Feel free to open an [issue](https://github.com/Theblockbuster1/disboard-auto-bump/issues?q=is%3Aissue) if the existing ones don't solve your problem. Also you can [chat with us here](https://github.com/Theblockbuster1/disboard-auto-bump/discussions/8)!
