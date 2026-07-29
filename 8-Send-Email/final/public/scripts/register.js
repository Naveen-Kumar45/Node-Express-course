const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const contactInput = document.getElementById("contact");
const submitBtn = form.querySelector('button[type="submit"]');
let togglePassword = document.getElementById("togglePassword")


 
if (passwordInput && togglePassword) { // Check if both elements exist before adding the event listener and toggling the password visibility

    togglePassword.addEventListener("click", () => {

        const isPassword = passwordInput.type === "password" // Check if the current type is "password"
        passwordInput.type= isPassword ? "text" : "password" // Toggle the type between "text" and "password"
 
        togglePassword.classList.toggle("fa-eye"); 
        togglePassword.classList.toggle("fa-eye-slash");

    });

}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    clearMessage();

    const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value,
        contact: contactInput.value.trim(),
    };

    if (!formData.name || !formData.email || !formData.password || !formData.contact) {
        return showMessage("Please fill in all fields", "error");
    }



    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
        return showMessage("Please enter a valid email address", "error");
    }

    if (formData.email !== formData.email.toLowerCase()) {
    return showMessage(
        "Please enter a valid email address.",
        "error"
      );
    }

    if (formData.password.length < 8) {
        return showMessage("Password must be at least 8 characters long","error");
    }

    const phoneRegex = /^[0-9+\-\s()]+$/;

    if (!phoneRegex.test(formData.contact)) {
        return showMessage("Please enter a valid phone number", "error");
    }

    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    try {
        const response = await fetch("/api/v1/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log(data)

        if (!response.ok) {
            throw new Error(data.msg || "Registration failed");
        }

        sessionStorage.setItem("verificationToken",data.verificationToken);
        sessionStorage.setItem("registeredEmail",formData.email);

        showMessage("Account created! Redirecting to verification...","success");

        setTimeout(() => {
            window.location.href = "/html/verify.html";
        }, 1500);

    } catch (error) {
        showMessage(error.message, "error");
    } finally {
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
    }
});