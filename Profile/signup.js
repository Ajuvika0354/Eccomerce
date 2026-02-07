// register.js
document
    .getElementById("registerForm")
    .addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission

        const name = document.getElementById("name").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // Create user object
        const user = {
            name: name,
            username: username,
            password: password,
        };

        // Send a POST request to the backend API
        fetch('http://localhost:5000/api/auth/register', { // Ensure this URL matches your backend endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            return response.json();
        })
        .then(data => {
            alert(data.message); // Show success message
            window.location.href = "profile.html"; // Redirect to login page
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    });