
function assignTeam() {
    const team = Math.random() < 0.5 ? 'Red' : 'Blue';
    return team;
}

function updateTeamText() {
    const teamText = document.getElementById('Team');
    const userTeam = assignTeam();
    teamText.textContent = `You are in the ${userTeam} team!`;
}

// Call updateTeamText when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    updateTeamText();
});