var team;
var redScore = 1;
var blueScore = 1;
const serverUrl = "http://localhost:3000"; // replace with server url if needed

function assignTeam() {
    const t = Math.random() < 0.5 ? 'Red' : 'Blue';
    return t;
}

function updateTeamText() {
    const teamText = document.getElementById('teamtext');
    teamText.textContent = `You are in the ${team} team!`;

    if (team == "Red") {
        teamText.style.color = "rgb(255, 102, 102)";
    } else if (team == "Blue") {
        teamText.style.color = "rgb(179, 198, 255)";
    }
}

team = assignTeam();

function updateScore() {
    const url = `${serverUrl}/updateScore?team=${team}`;

    fetch(url)
            .then(response => response.json())
            .then(data => {
                redScore = data.redScore;
                blueScore = data.blueScore;
                console.log("Scores updated:", redScore, blueScore);
                updatePlayScreen(redScore, blueScore);
            })
            .catch(error => console.error("Error updating score:", error));
}

function updatePlayScreen(rS, bS) {
    const redBox = document.getElementById("redteam");
    const blueBox = document.getElementById("blueteam");
    redBox.style.flex = rS;
    blueBox.style.flex = bS;
}

// Call updateTeamText when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    updateTeamText();
});