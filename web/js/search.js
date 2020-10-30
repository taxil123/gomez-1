load();

function load() {
    var q = window.location.search.substring(3);
    document.getElementById("query").innerHTML = decodeURIComponent(q);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/search/" + window.location.search);
    xhr.send();
    xhr.onload = function () {
        document.getElementById("load").style.display = "none";
        var json = JSON.parse(xhr.responseText);
        for (var c in json) {
            var a = document.createElement("A");
            a.href = json[c].desc;
            var div = document.createElement("DIV");
            div.classList.add("result");
            var h2 = document.createElement("H2");
            h2.innerHTML = json[c].title;
            div.appendChild(h2);
            var sp = document.createElement("H3");
            sp.innerHTML = "seeds: " + json[c].seeds.toLocaleString() + " -  peers: " + json[c].peers.toLocaleString();
            div.appendChild(sp);
            var da = document.createElement("H3");
            da.innerHTML = "date created: " + json[c].time;
            div.appendChild(da);
            var size = document.createElement("H3");
            size.innerHTML = "size: " + json[c].size;
            div.appendChild(size);
            var pr = document.createElement("H3");
            pr.innerHTML = "provider: " + json[c].provider;
            div.appendChild(pr);
            a.appendChild(div);
            document.getElementById("searchResults").appendChild(a);
        }
    }
}