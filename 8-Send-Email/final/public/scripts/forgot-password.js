const form = document.querySelector("form");
const emailInput = document.getElementById("email");
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    clearMessage();

    const email = emailInput.value.trim();

    if (!email) {
        return showMessage(
            "Please enter your email address",
            "error"
        );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return showMessage(
            "Please enter a valid email address",
            "error"
        );
    }

    if (email !== email.toLowerCase()) {
        return showMessage(
            "Please enter valid email",
            "error"
        );
    }

    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    try {
        const response = await fetch(
            "/api/v1/auth/forgotpassword",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.msg || "Failed to send reset link"
            );
        }

        showMessage(
            data.msg ||
            "Password reset link has been sent to your email.",
            "success"
        );


        form.reset();

        setTimeout(() => {
            window.location.href = "/html/login.html";
        }, 2000);

    } catch (error) {
        showMessage(error.message, "error");
    } finally {
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
    }
});