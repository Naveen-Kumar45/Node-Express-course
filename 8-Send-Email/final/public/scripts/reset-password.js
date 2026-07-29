const form = document.querySelector("form");
const newPasswordInput = document.getElementById("newpassword");
const confirmPasswordInput = document.getElementById("confirmpassword");
const submitBtn = form.querySelector('button[type="submit"]');
const togglePassword1 = document.getElementById("togglePassword1");
const togglePassword2 = document.getElementById("togglePassword2");

const params = new URLSearchParams(window.location.search);
const token = params.get("token");

if (!token) {
    showMessage(
        "Missing reset token. Please use the password reset link from your email.",
        "error"
    );

    submitBtn.disabled = true;
}

if (togglePassword1 && newPasswordInput) {
    togglePassword1.addEventListener("click", () => {
        const isPassword = newPasswordInput.type === "password";

        newPasswordInput.type = isPassword ? "text" : "password";

        togglePassword1.classList.toggle("fa-eye");
        togglePassword1.classList.toggle("fa-eye-slash");
    });
}

if (togglePassword2 && confirmPasswordInput) {
    togglePassword2.addEventListener("click", () => {
        const isPassword = confirmPasswordInput.type === "password";

        confirmPasswordInput.type = isPassword ? "text" : "password";

        togglePassword2.classList.toggle("fa-eye");
        togglePassword2.classList.toggle("fa-eye-slash");
    });
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    clearMessage();

    if (!token) return;

    const newpassword = newPasswordInput.value.trim();
    const confirmpassword = confirmPasswordInput.value.trim();

    if (!newpassword || !confirmpassword) {
        return showMessage(
            "Please enter both password fields.",
            "error"
        );
    }

    if (newpassword.length < 8) {
        return showMessage(
            "Password must be at least 8 characters long.",
            "error"
        );
    }

    if (newpassword !== confirmpassword) {
        return showMessage(
            "Passwords do not match.",
            "error"
        );
    }

    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    try {
        const response = await fetch("/api/v1/auth/resetpassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                newpassword,
                confirmpassword,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.msg || "Failed to reset password"
            );
        }

        showMessage(
            data.msg ||
            "Password updated successfully!",
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