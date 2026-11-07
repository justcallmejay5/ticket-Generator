
/*
    Project: Coding Conf 2026
    File: validation.js
    Purpose: Validate registration information and save attendee details.
*/

// Get the registration form
const registrationForm = document.getElementById("registrationForm");

// Get all form fields
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const github = document.getElementById("github");
const avatar = document.getElementById("avatar");

// Maximum image size: 500KB
const MAX_FILE_SIZE = 500 * 1024;

// Display an error message beside a field
function showError(fieldId, message) {
    document.getElementById(fieldId).textContent = message;
}

// Clear all previous error messages
function clearErrors() {
    showError("nameError", "");
    showError("emailError", "");
    showError("githubError", "");
    showError("avatarError", "");
}

// Validate full name
function validateName() {
    const nameValue = fullName.value.trim();

    if (nameValue === "") {
        showError("nameError", "Please enter your full name.");
        return false;
    }

    return true;
}

// Validate email address
function validateEmail() {
    const emailValue = email.value.trim();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailValue === "") {
        showError("emailError", "Please enter your email address.");
        return false;
    }

    if (!emailPattern.test(emailValue)) {
        showError("emailError", "Please enter a valid email address.");
        return false;
    }

    return true;
}

// Validate GitHub username
function validateGithub() {
    const githubValue = github.value.trim();

    const githubPattern = /^@[a-zA-Z0-9-]{1,39}$/;

    if (githubValue === "") {
        showError("githubError", "Please enter your GitHub username.");
        return false;
    }

    if (!githubPattern.test(githubValue)) {
        showError("githubError", "Username must start with @ and contain a valid GitHub username.");
        return false;
    }

    return true;
}

// Validate avatar image
function validateAvatar() {
    const selectedFile = avatar.files[0];

    if (!selectedFile) {
        showError("avatarError", "Please upload a profile picture.");
        return false;
    }

    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(selectedFile.type)) {
        showError("avatarError", "Only JPEG and PNG images are accepted.");
        return false;
    }

    if (selectedFile.size >= MAX_FILE_SIZE) {
        showError("avatarError", "Image must be smaller than 500KB.");
        return false;
    }

    return true;
}

// Convert the uploaded image into a Data URL
function saveRegistration(file) {
    const reader = new FileReader();

    reader.onload = function () {

        // Generate a unique ticket number
        const ticketNumber = Math.floor(10000 + Math.random() * 90000);

        // Create the registration object
        const registrationData = {
            fullName: fullName.value.trim(),
            email: email.value.trim(),
            github: github.value.trim(),
            avatar: reader.result,
            ticketNumber: ticketNumber
        };

        // Save information in browser storage
        localStorage.setItem(
            "codingConfRegistration",
            JSON.stringify(registrationData)
        );

        // Redirect to the ticket page
        window.location.href = "ticket.html";
    };

    reader.onerror = function () {
        showError("avatarError", "Unable to read the selected image. Please try again.");
    };

    reader.readAsDataURL(file);
}

// Handle form submission
registrationForm.addEventListener("submit", function (event) {

    // Stop the form from submitting automatically
    event.preventDefault();

    // Remove old errors
    clearErrors();

    // Run all validation functions
    const nameIsValid = validateName();
    const emailIsValid = validateEmail();
    const githubIsValid = validateGithub();
    const avatarIsValid = validateAvatar();

    // Only continue if every field is valid
    if (
        nameIsValid &&
        emailIsValid &&
        githubIsValid &&
        avatarIsValid
    ) {
        saveRegistration(avatar.files[0]);
    }

});

// Clear individual error messages when the user edits a field
fullName.addEventListener("input", function () {
    showError("nameError", "");
});

email.addEventListener("input", function () {
    showError("emailError", "");
});

github.addEventListener("input", function () {
    showError("githubError", "");
});

avatar.addEventListener("change", function () {
    showError("avatarError", "");
});
