var team;

function assignTeam() {
    const t = Math.random() < 0.5 ? 'Red' : 'Blue';
    return t;
}

function updateTeamText() {
    const teamText = document.getElementById('Team');
    teamText.textContent = `You are in the ${team} team!`;
}

team = assignTeam();

// Call updateTeamText when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    updateTeamText();
});