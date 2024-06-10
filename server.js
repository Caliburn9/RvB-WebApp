const http = require("http");
const fs = require("fs");
const path = require("path");
const port = 3000;

const server = http.createServer(function(req, res) {
    // Send the index.html
    if (req.url === "/" || req.url === "/index.html") {
        res.writeHead(200, { "Content-Type" : "text/html" });
        fs.readFile("index.html", function(error, data) {
            if (error) {
                res.writeHead(404);
                res.write("Error: Page not found");
            } else {
                res.write(data);
            }
            res.end();
        });
    // Serve the CSS file
    } else if (req.url === "/styles.css") {
        res.writeHead(200, { "Content-Type" : "text/css" });
        fs.readFile("styles.css", function(error, data) {
            if (error) {
                res.writeHead(404);
                res.write("Error: Page not found");
            } else {
                res.write(data);
            }
            res.end();
        });
    } else {
        res.writeHead(404);
        res.write("Error: Page not found");
        res.end();
    }
})

server.listen(port, function(error) {
    if (error) {
        console.log("Something went wrong", error);
    } else {
        console.log("Server listening at http://localhost:" + port);
    }
})
