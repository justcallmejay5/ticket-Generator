
/*
    Project: Coding Conf 2026
    File: ticket.js
    Purpose: Retrieve registration information and generate the digital ticket.
*/

// Retrieve registration information from localStorage
const savedRegistration = localStorage.getItem("codingConfRegistration");

// Check whether registration information exists
if (savedRegistration === null) {

    // Redirect visitors who have not registered
    window.location.href = "index.html";

} else {

    // Convert stored JSON information into a JavaScript object
    const attendee = JSON.parse(savedRegistration);

    // Display attendee's full name
    document.getElementById("ticketName").textContent =
        attendee.fullName;

    // Display personalised success message
    document.getElementById("successMessage").textContent =
        "Congrats, " + attendee.fullName + "! Your ticket is ready.";

    // Display GitHub username
    document.getElementById("githubUsername").textContent =
        attendee.github;

    // Create GitHub profile link without the @ symbol
    const githubLink = attendee.github.substring(1);

    document.getElementById("ticketGithub").href =
        "https://github.com/" + encodeURIComponent(githubLink);

    // Display uploaded profile picture
    document.getElementById("ticketAvatar").src =
        attendee.avatar;

    // Display unique ticket number
    document.getElementById("ticketNumber").textContent =
        "#" + attendee.ticketNumber;
}
