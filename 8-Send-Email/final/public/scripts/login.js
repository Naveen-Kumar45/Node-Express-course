const form = document.querySelector("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
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
        email: emailInput.value.trim(),
        password: passwordInput.value,
    };

    if (!formData.email || !formData.password) {
        return showMessage(
            "Please enter email and password",
            "error"
        );
    }

    if (formData.email !== formData.email.toLowerCase()) {
        return showMessage(
            "Please enter your email in lowercase.",
            "error"
        );
    }

    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    try {
        const response = await axios.post("/api/v1/auth/login",formData)
        console.log(response)

        localStorage.setItem("token", response.data.authToken);

        showMessage("Login successful!", "success");

        console.log(response.data.user);

        setTimeout(() => {
          window.location.href = "/html/dashboard.html";
        }, 1500);

    } catch (error) {
      if (error.response?.data?.verified === false) {
        sessionStorage.setItem(
            "verificationToken",
            error.response.data.verificationToken
        );

        sessionStorage.setItem(
            "registeredEmail",
            formData.email
        );

        window.location.href = "/html/verify.html";
        return;
      }
        showMessage(error.response.data.msg || error.message, "error");
    } finally {
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
    }
});