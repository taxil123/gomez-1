load();

function load() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/speed");
    xhr.send();
    xhr.onload = function () {
        var json = JSON.parse(xhr.responseText);
        var dur = json.joined.duration;
        document.getElementById("duration").innerHTML = dur / 1000;
        for (var c in json.individual) {
            if (json.individual[c].provider == "1337x") {document.getElementById("1337x").innerHTML = (json.individual[c].duration / 1000) + "s"}
            else if (json.individual[c].provider == "KickassTorrents") {document.getElementById("kat").innerHTML = (json.individual[c].duration / 1000) + "s"}
            else if (json.individual[c].provider == "Limetorrents") {document.getElementById("lime").innerHTML = (json.individual[c].duration / 1000) + "s"}
            else if (json.individual[c].provider == "Rarbg") {document.getElementById("rarbg").innerHTML = (json.individual[c].duration / 1000) + "s"}
            else if (json.individual[c].provider == "ThePirateBay") {document.getElementById("tpb").innerHTML = (json.individual[c].duration / 1000) + "s"}
            else if (json.individual[c].provider == "Torrent9") {document.getElementById("t9").innerHTML = (json.individual[c].duration / 1000) + "s"}
            else if (json.individual[c].provider == "TorrentProject") {document.getElementById("tp").innerHTML = (json.individual[c].duration / 1000) + "s"}
            else if (json.individual[c].provider == "Yts") {document.getElementById("yts").innerHTML = (json.individual[c].duration / 1000) + "s"}
        }
        var date = new Date(json.joined.lastTest);
        if (date.getDate().toString().length == 1) {
            var d = "0" + date.getDate();
        } else {
            var d = date.getDate()
        }
        if (date.getMinutes().toString().length == 1) {
            var m = "0" + date.getMinutes()
        } else {
            var m = date.getMinutes()
        }
        if (date.getSeconds().toString().length == 1) {
            var s = "0" + date.getSeconds()
        } else {
            var s = date.getSeconds()
        }
        var dt = (date.getMonth() + 1) + "/" + (d) + "/" + (date.getFullYear()) + " @ " + (date.getHours()) + ":" + (m) + ":" + (s);
        document.getElementById("dt").innerHTML = dt;
    }
}
