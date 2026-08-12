document.getElementById("login").addEventListener("click", async function () {

    // Input se values lena
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    if (!email || !password) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "🛑 Please fill in both email and password fields.";
        return;
    }

    errorMessage.style.display = "none"; // Hide error message if inputs are valid

    // FastAPI ko bhejne ke liye data
    const loginData = {
        username: email,
        password: password
    };

    try {

        const response = await fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        const result = await response.json();
        if (response.ok) {
            location.reload();
        }
    } catch (error) {
        console.error("Error:", error);
    }
});