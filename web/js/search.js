load();

function load() {
    var q = window.location.search.substring(3);
    document.getElementById("search").innerHTML = "getting results for " + decodeURIComponent(q) + "...";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/search/" + window.location.search);
    xhr.send();
    xhr.onload = function () {
        document.getElementById("load").style.display = "none";
        var json = JSON.parse(xhr.responseText);
        document.getElementById("search").innerHTML = json.length.toLocaleString() + " search results for " + decodeURIComponent(q);
        for (var c in json) {
            var div = document.createElement("DIV");
            div.classList.add("result");
            var lDiv = document.createElement("DIV");
            lDiv.classList.add("leftSide")
            var h2 = document.createElement("H2");
            h2.innerHTML = json[c].title;
            lDiv.appendChild(h2);
            var details = document.createElement("H3");
            if (json[c].peers) {
                var peers = json[c].peers.toLocaleString() 
            } else {
                var peers = "[N/A]";
            }
            details.innerHTML = json[c].time + " • " + json[c].size + " • " + json[c].provider + " • " + json[c].seeds.toLocaleString() + " seeds • " + peers + " peers";
            lDiv.appendChild(details);
            div.appendChild(lDiv);
            var rDiv = document.createElement("DIV");
            rDiv.classList.add("rightSide");
            if (json[c].magnet) {
                var magnet = document.createElement("A");
                var magnetb = document.createElement("BUTTON");
                magnetb.innerHTML = "🧲 Magnet Link";
                magnetb.classList.add("halfButton");
                magnetb.style = "margin-right:2%;"
                magnet.href = json[c].magnet;
                magnet.appendChild(magnetb);
                rDiv.appendChild(magnet);
                var cpmg = document.createElement("BUTTON");
                cpmg.classList.add("halfButton");
                cpmg.innerHTML = "🧲 Copy";
                cpmg.value = json[c].magnet;
                cpmg.onclick = function () {
                    copyToClipboard(this.value);
                };
                rDiv.appendChild(cpmg);
            }
            if (json[c].link) {
                var dl = document.createElement("A");
                var dlb = document.createElement("BUTTON");
                dlb.innerHTML = "📥 Download Torrent";
                dl.href = "https://href.li/?" + json[c].link;
                dl.appendChild(dlb);
                rDiv.appendChild(dl);
            }
            if (json[c].desc) {
                var l = document.createElement("A");
                var lb = document.createElement("BUTTON");
                lb.innerHTML = "🔗 Website Link";
                l.href = "https://href.li/?" + json[c].desc;
                l.appendChild(lb);
                rDiv.appendChild(l);
            }
            div.appendChild(rDiv);
            document.getElementById("searchResults").appendChild(div);
        }
    }
}