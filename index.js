const http = require("http");
const fs = require("fs");
const url = require("url");
const tsapi = require("torrent-search-api");
const port = process.env.PORT || 8250;

tsapi.enablePublicProviders();
http.createServer(renderServer).listen(port);
console.log("gomez - running on port " + port);
 
async function renderServer(req, res) {
    var url_parsed = url.parse(req.url, true);
    var lPath = "./web" + url_parsed.pathname;
    if (fs.existsSync(lPath)) {
        var ft = lPath.split(".")[lPath.split(".").length - 1];
        fs.readFile(lPath, function(err, resp) {
            if (err) {
                if (err.code == "ENOENT") {
                    fs.readFile("./errors/404.html", function (err, resp) {
                        if (err) {
                            res.end(err.code + " - server error");
                            res.writeHead(500,  {
                                "Access-Control-Allow-Origin": "*",
                                "Content-Type": "text/plain",
                                "Server": "gomez"
                            })
                        } else {
                            res.writeHead(404,  {
                                "Access-Control-Allow-Origin": "*",
                                "Content-Type": "text/html",
                                "Server": "gomez"
                            })
                            res.end(resp);
                        }
                    })
                } else if (err.code == "EISDIR") {
                    fs.readFile(lPath + "index.html", function(err, resp) {
                        if (err) {
                            if (err.code == "ENOENT") {
                                fs.readFile("./errors/404.html", function (err, resp) {
                                    if (err) {
                                        res.writeHead(404,  {
                                            "Access-Control-Allow-Origin": "*",
                                            "Content-Type": "text/plain",
                                            "Server": "gomez"
                                        })
                                    } else {
                                        res.writeHead(500,  {
                                            "Access-Control-Allow-Origin": "*",
                                            "Content-Type": "text/html",
                                            "Server": "gomez"
                                        })
                                        res.end(resp);
                                    }
                                })
                            } else {
                                fs.readFile("./errors/500.html", function (err, resp) {
                                    if (err) {
                                        res.end(err.code + " - server error");
                                        res.writeHead(500,  {
                                            "Access-Control-Allow-Origin": "*",
                                            "Content-Type": "text/plain",
                                            "Server": "gomez"
                                        })
                                    } else {
                                        res.writeHead(500,  {
                                            "Access-Control-Allow-Origin": "*",
                                            "Content-Type": "text/html",
                                            "Server": "gomez"
                                        })
                                        res.end(resp);
                                    }
                                })
                            }
                        } else {
                            res.writeHead(200,  {
                                "Access-Control-Allow-Origin": "*",
                                "Content-Type": "text/html",
                                "Server": "gomez"
                            })
                            res.end(resp);
                        }
                    })
                } else {
                    fs.readFile("./errors/500.html", function (err, resp) {
                        if (err) {
                            res.end(err.code + " - server error");
                            res.writeHead(500,  {
                                "Access-Control-Allow-Origin": "*",
                                "Content-Type": "text/plain",
                                "Server": "gomez"
                            })
                        } else {
                            res.writeHead(500,  {
                                "Access-Control-Allow-Origin": "*",
                                "Content-Type": "text/html",
                                "Server": "gomez"
                            })
                            res.end(resp);
                        }
                    })
                }
            } else {
                if (ft == "html") {
                    res.writeHead(200,  {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "text/html",
                        "Server": "gomez"
                    });
                } else if (ft == "css") {
                    res.writeHead(200,  {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "text/css",
                        "Server": "gomez"
                    });
                } else if (ft == "js") {
                    res.writeHead(200,  {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/javascript",
                        "Server": "gomez"
                    });
                } else if (ft == "png"){
                    res.writeHead(200,  {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "image/png",
                        "Server": "gomez"
                    });
                } else {
                    res.writeHead(200,  {
                        "Access-Control-Allow-Origin": "*",
                        "Server": "gomez"
                    });
                }
                res.end(resp);
            }
        })
    } else if (url_parsed.pathname.substring(0,5) == "/api/") {
        var path = url_parsed.pathname.toString().split("/").slice(2);
        if (path[0] == "search") {
            if (url_parsed.query.q) {
                var t = await tsapi.search(url_parsed.query.q);
                var json = JSON.stringify(t);
                res.writeHead(200,  {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Server": "gomez"
                });
                res.end(json);
            } else {
                var json = JSON.stringify({
                    "err": {
                        "code": "noQuery",
                        "message": "No query was entered."
                    }
                });
                res.writeHead(400,  {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Server": "gomez"
                });
                res.end(json);
            }
        } else {
            var json = JSON.stringify({
                "err": {
                    "code": "invalidEndpoint",
                    "message": "Endpoint is invalid."
                }
            });
        }
    } else {
        fs.readFile("./errors/404.html", function (err, resp) {
            if (err) {
                res.writeHead(404,  {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "text/plain",
                    "Server": "gomez"
                })
            } else {
                res.writeHead(500,  {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "text/html",
                    "Server": "gomez"
                })
                res.end(resp);
            }
        })
    }
}