$("head").append(`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@3/dark.css">`);
chrome.storage.sync.get(['safetymode'], function(data) {
    const safetymode = data.safetymode;
    console.log("Is Safety Mode enabled?: " + safetymode);
    if (safetymode == undefined) {
      Swal.fire({
        title: 'DISCLAIMER',
        html: `By clicking 'I agree', you understand that your server could get banned off Disboard if you use this extension. Use this at your own risk.`,
        icon: 'warning',
        confirmButtonText: '<b>I agree</b>'
      }).then(() => {
        Swal.fire(
          'Hey!',
          `Please open the extension popup (by clicking on the extension icon) at least once before using this extension.
Once you have opened the popup, please press 'OK'.`,
          'warning'
        ).then(() => {window.location = window.location});
      });
    };

    function defineTabID(ServerID) {
        var iPageTabID = sessionStorage["tabID"];
        if (iPageTabID != ServerID) {
            //var iLocalTabID = localStorage["tabID"];
            var iPageTabID = ServerID;
            localStorage["tabID"] = iPageTabID;
            sessionStorage["tabID"] = iPageTabID;
        }
    }

    var ID = sessionStorage.getItem("tabID");

    if (!ID) {
      Swal.fire(
        'Hey!',
        'Please select the server to be auto bumped.',
        'error'
      )
    }

setTimeout(function(){ // allows the bump button to load it's timer text (00:00:00) before checking if it should be bumped - a temporary and unreliable fix to the captcha popup problem but it works ¯\_(ツ)_/¯
    $("[href]:not(.languages > li > a)").attr("target", "_blank");

    var d = new Date(),
      h = (d.getHours()<10?'0':'') + d.getHours(),
      m = (d.getMinutes()<10?'0':'') + d.getMinutes(),
      s = (d.getSeconds()<10?'0':'') + d.getSeconds();

    Object.defineProperty(document, "hidden", { value : false});

    $(".navbar-start").append(`<a class="navbar-item" id="bump" title="Made by Theblockbuster1!">
                        <span class="icon"><span class="icon-robot"></span></span>
                        <span style="background-image: linear-gradient(to left, orange, red);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;" class="text" id="bumpcount" >Autobumper Enabled: 00:00:00</span>
                    </a>`);
    $(".tabs ul").append(`<li style="margin-left: auto;" title="" + d + "">
                <a>
                    <span class="icon is-small"><i class="icon-sync"></i></span>
                    <span>Page Loaded: ` + h + `:` + m + `:` + s + `</span>
                </a>
            </li>`);
    $("div.actions.columns div").prepend(`<a class="button is-dark" id="pick">
                            <span class="icon"><img src="data:image/gif;base64,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" alt="Bump Me!"></span>
                        </a>`);

    const lang = $("html").attr("lang") == "en" ? "" : "/" + $("html").attr("lang").toLowerCase();

    $(document).on("click", "#pick", function () {
        $(this).attr("id", "transferring");
        defineTabID($(`#transferring ~ [href^="${lang}/server/bump/"]`).attr("href").replace(RegExp(`${lang}/server/bump/`, "g"), ''));
        window.location = window.location;
    });

    if (safetymode == true) {
        var safety = Math.floor(Math.random() * 1801);
    }
    else {
        safety = 0;
    };

    try {
        var grabbedmin = Number($("[href='" + lang + "/server/bump/" + ID + "']").attr("data-remaining"));
    }
    catch(err) {
        if (ID) {
          Swal.fire(
            'Hey!',
            'Please select the server to be auto bumped.',
            'error'
          )
        };
    };

    $("[href='" + lang + "/server/bump/" + ID + "'] span i:last-of-type").attr("class", "icon-robot");
    $("[href='" + lang + "/server/bump/" + ID + "']").attr("id", "bumpme");
    $("[href='" + lang + "/server/bump/" + ID + "']").removeAttr("disabled");

    $("head").append(`<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">`);
    $("head").append(`<style>
    @keyframes rotate {
      100% {
        transform: rotate(1turn);
      }
    }

    #bumpme {
      position: relative;
      z-index: 0;
      border-radius: 10px;
      overflow: hidden;
      cursor: not-allowed !important;
    }

    #bumpme::before {
      content: '';
      position: absolute;
      z-index: -2;
      left: -150%;
      top: -150%;
      width: 400%;
      height: 400%;
      background-color: orange;
      background-repeat: no-repeat;
      background-size: 50% 50%, 50% 50%;
      background-position: 0 0, 100% 0, 100% 100%, 0 100%;
      background-image: linear-gradient(to left, orange, red 50%),linear-gradient(to right, orange, red 50%),linear-gradient(to right, orange, red 50%),linear-gradient(to left, orange, red 50%);
      animation: rotate 4s linear infinite;
    }

    #bumpme::after {
      content: '';
      position: absolute;
      z-index: -1;
      left: 6px;
      top: 6px;
      width: calc(100% - 12px);
      height: calc(100% - 12px);
      background: white;
      border-radius: 5px;
    }
    </style>`);

    function bump() {
        try {
            $('#bumpme')[0].click();
            console.log("Bumped! - " + ID);
        }
        catch(err) {
            console.error("Bump failed... - " + ID + " - " + err);
        };
    };

    String.prototype.toHHMMSS = function () {
        if (isNaN(this)) return '--:--:--';
        var sec_num = parseInt(this, 10);
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) {hours = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours+':'+minutes+':'+seconds;
    }

    function run(fn) {
      if(typeof(Worker) !== "undefined") {
        if(typeof(w) == "undefined") {
          w = new Worker(URL.createObjectURL(new Blob(['('+fn+')()'])));
        }
        w.onmessage = function(event) {
          var numberwow = event.data - safety;
          var numberwoah = Number(grabbedmin) - numberwow;
          document.getElementById("bumpcount").innerHTML = "Autobumper Enabled: " + numberwoah.toString().toHHMMSS();
          if (isNaN(grabbedmin) && ID) {
            bump()
            w.terminate();
          } else if (numberwow == grabbedmin) {
            bump()
            w.terminate();
          } else if (isNaN(numberwoah)) {
            bump()
            w.terminate();
          }
        };
      } else {
        try {
        Swal.fire(
          'Hey!',
          'Sorry, your browser does not support Disboard Auto Bump... (try downgrading to version 0.1).',
          'error'
        )
        }
        catch(err) {
          alert("Sorry, your browser does not support Disboard Auto Bumper... (try downgrading to version 0.1)");
        };
      }
    }

    const worker = run(function() {

      var i = 0;

      function timedCount() {
        i = i + 1;
        postMessage(i);
        setTimeout(function(){timedCount()},1000);
      }

      timedCount();
    });
},3000);
});
