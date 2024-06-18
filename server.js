const http = require("http");
const fs = require("fs");
const path = require("path");
const port = 3000;

// Initialise score for each team 
let redScore = 1;
let blueScore = 1;
const SCORE_INCREMENT = 0.25;

function serveFile(res, filePath, contentType) {
    fs.readFile(filePath, function(error, data) {
        if (error) {
            res.writeHead(404);
            res.write("Error: Page not found for serveFile");
        } else {
            res.writeHead(200, { "Content-Type" : contentType });
            res.write(data);
        }
        res.end();
    });
}

function loadScores() {
    try {
        const data = fs.readFileSync(path.join(__dirname, "scores.json"), "utf8");
        const scores = JSON.parse(data);
        redScore = scores.redScore || 0;
        blueScore = scores.blueScore || 0;
        console.log("Scores loaded:", redScore, blueScore);
    } catch (err) {
        console.log("Error loading scores:", err);
    }
}

function saveScores() {
    const filePath = path.join(__dirname, "scores.json");
    const scores = { redScore, blueScore };
    try {
        fs.writeFileSync(filePath, JSON.stringify(scores), "utf8");
        console.log("Scores saved:", redScore, blueScore);
    } catch (err) {
        console.log("Error saving scores:", err);
    }
}

loadScores();

const server = http.createServer(function(req, res) {
    // Serve index.html as the default page
    if (req.url === "/" || req.url === "/index.html") {
        serveFile(res, path.join(__dirname, "index.html"), "text/html");
    // Handle other requests (styles.css, app.js, etc.)
    } else if (req.url === "/styles.css") {
        serveFile(res, path.join(__dirname, "styles.css"), "text/css");
    } else if (req.url === "/app.js") {
        serveFile(res, path.join(__dirname, "app.js"), "text/javascript");
    } else if (req.url === "/scores") {
        res.writeHead(200, { "Content-Type" : "application.json" });
        res.end(JSON.stringify({ redScore, blueScore }));
    } else if (req.url.startsWith("/updateScore")) {
        const urlObj = new URL(`http://dummyhost${req.url}`);
        const team = urlObj.searchParams.get("team");

        if (team === "Red") {
            redScore += SCORE_INCREMENT;
            blueScore = Math.max(0, blueScore - SCORE_INCREMENT);
        } else if (team === "Blue") {
            blueScore += SCORE_INCREMENT;
            redScore = Math.max(0, redScore - SCORE_INCREMENT);
        }

        saveScores();
        res.writeHead(200, { "Content-Type" : "application/json" });
        res.end(JSON.stringify({ redScore, blueScore }));
    } else {
        res.writeHead(404);
        res.write("Error: Page not found");
        res.end();
    }
});

server.listen(port, function(error) {
    if (error) {
        console.log("Something went wrong", error);
    } else {
        console.log("Server listening at http://localhost:" + port);
    }
});
