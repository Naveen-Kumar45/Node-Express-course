const otpBoxes = document.querySelectorAll(".otp-box");
const verifyForm = document.getElementById("verify-form");
const verifyBtn = document.querySelector(".verify-btn");
const resendBtn = document.querySelector(".resend-btn");
const emailInput = document.getElementById("email");

const registeredEmail = sessionStorage.getItem("registeredEmail");

if (registeredEmail) {
    emailInput.value = registeredEmail;
} else {
    emailInput.placeholder = "Email not found";
}

const getOTP = () => {
    return [...otpBoxes].map((box) => box.value).join("");
};

otpBoxes.forEach((box, index) => {
    box.addEventListener("input", (e) => {
        const value = e.target.value;

        if (!/^\d$/.test(value) && value !== "") {
            e.target.value = "";
            return;
        }

        if (value) {
            box.classList.add("filled");

            if (index < otpBoxes.length - 1) {
                otpBoxes[index + 1].focus();
            }
        } else {
            box.classList.remove("filled");
        }
    });

    box.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !box.value && index > 0) {
            otpBoxes[index - 1].focus();
        }
    });

    box.addEventListener("paste", (e) => {
        e.preventDefault();

        const digits = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6)
            .split("");

        digits.forEach((digit, i) => {
            if (otpBoxes[i]) {
                otpBoxes[i].value = digit;
                otpBoxes[i].classList.add("filled");
            }
        });

        otpBoxes[Math.min(digits.length, otpBoxes.length - 1)].focus();
    });
});

verifyForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    clearMessage();

    const otp = getOTP();

    if (otp.length !== 6) {
        return showMessage("Please enter all 6 digits", "error");
    }

    const verificationToken = sessionStorage.getItem("verificationToken");

    if (!verificationToken) {
        return showMessage(
            "Verification token not found. Please register or login again.",
            "error"
        );
    }

    verifyBtn.classList.add("loading");
    verifyBtn.disabled = true;

    try {
        const response = await fetch("/api/v1/auth/register/verifyemail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${verificationToken}`,
            },
            body: JSON.stringify({ otp }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.msg || "Verification failed");
        }

        sessionStorage.removeItem("verificationToken");
        sessionStorage.removeItem("registeredEmail");

        showMessage(
            data.msg || "Email verified successfully!",
            "success"
        );

        setTimeout(() => {
            window.location.href = "/html/login.html";
        }, 1500);

    } catch (error) {
        showMessage(error.message, "error");
    } finally {
        verifyBtn.classList.remove("loading");
        verifyBtn.disabled = false;
    }
});

resendBtn.addEventListener("click", async () => {
    clearMessage();

    resendBtn.classList.add("loading");
    resendBtn.disabled = true;

    try {
        const response = await fetch("/api/v1/auth/resendverification", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: emailInput.value,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.msg || "Failed to resend OTP");
        }

        sessionStorage.setItem(
            "verificationToken",
            data.verificationToken
        );

        showMessage("OTP has been sent again.", "success");

        otpBoxes.forEach((box) => {
            box.value = "";
            box.classList.remove("filled");
        });

        otpBoxes[0].focus();

    } catch (error) {
        showMessage(error.message, "error");
    } finally {
        resendBtn.classList.remove("loading");
        resendBtn.disabled = false;
    }
});