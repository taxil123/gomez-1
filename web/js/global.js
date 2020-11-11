if (document.getElementById("q")) {
    document.getElementById("q").addEventListener("keyup", function(e) {
        if (e.keyCode == 13) {window.open("/search/?q=" + encodeURIComponent(document.getElementById("q").value), "_self");}
    })
}

function copyToClipboard(s) {
    var l = document.createElement("TEXTAREA");
    l.value = s;
    l.setAttribute("readonly", "");
    l.setAttribute("style", "position:absolute;left:-9999px");
    document.body.appendChild(l);
    l.select();
    document.execCommand("copy");
    document.body.removeChild(l);
}