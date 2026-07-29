const username = document.getElementById("username");
const email = document.getElementById("email");
const status = document.getElementById("status");
const avatar = document.getElementById("avatar");
const logout = document.getElementById("logout");

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "/html/login.html";
}
console.log(token)
async function getDashboard() {
    try {
        const response = await fetch("/api/v1/auth/dashboard", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        console.log(data)

        if (!response.ok) {
            throw new Error(data.msg || "Failed to load dashboard");
        }

        username.textContent = data.name;
        email.textContent = data.email;

        avatar.textContent = data.name.charAt(0).toUpperCase();

        if (data.isVerified) {
            status.textContent = "✔ Verified";
            status.style.color = "#16a34a";
        } else {
            status.textContent = "✖ Not Verified";
            status.style.color = "#dc2626";
        }

    } catch (error) {
        console.error("Dashboard Error:", error);
        alert(error.message);
    }
}

logout.addEventListener("click", () => {
    window.location.href = "/html/login.html";
    localStorage.removeItem("token");
});

getDashboard();