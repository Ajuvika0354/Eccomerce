document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Invalid credentials");
            return;
        }

        alert("Login successful ✅");

        // Save login state
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect
        window.location.href = "../Landingpage/index.html";

    } catch (error) {
        console.error(error);
        alert("Server not reachable ❌");
    }
});
