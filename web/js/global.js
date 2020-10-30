if (document.getElementById("q")) {
    document.getElementById("q").addEventListener("keyup", function(e) {
        if (e.keyCode == 13) {window.open("/search/?q=" + encodeURIComponent(document.getElementById("q").value), "_self");}
    })
}