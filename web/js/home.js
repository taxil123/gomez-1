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
            var tableItem = document.createElement("tr");
            var name = document.createElement("th");
            name.scope = "col";
            name.innerHTML = json.individual[c].provider;
            tableItem.appendChild(name);
            var speed = document.createElement("th");
            speed.scope = "col";
            speed.innerHTML = (json.individual[c].duration / 1000) + "s";
            tableItem.appendChild(speed);
            document.querySelector("table").appendChild(tableItem);
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
