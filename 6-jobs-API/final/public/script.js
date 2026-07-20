const API_BASE = "/api/v1";

async function parseResponse(res) {
  const text = await res.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch (err) {
    data = {};
  }

  if (!res.ok) {
    throw new Error(data.msg || data.error || data.message || "Something went wrong");
  }

  return data;
}

function getToken() {
  return localStorage.getItem("token");
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`
  };
}

function showMessage(el, type, text) {
  if (!el) return;
  el.className = `message ${type}`;
  el.textContent = text;
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "/index.html";
}

if (document.getElementById("auth-form")) {
  const authForm = document.getElementById("auth-form");
  const message = document.getElementById("message");
  const nameGroup = document.getElementById("name-group");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const submitBtn = authForm.querySelector("button[type='submit']");
  const toggleBtns = document.querySelectorAll(".toggle-btn");

  let mode = "login";

  if (getToken()) {
    window.location.href = "/jobs.html";
  }

  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      mode = btn.dataset.mode;
      nameGroup.classList.toggle("hidden", mode === "login");
      submitBtn.textContent = mode === "login" ? "Login" : "Register";
      showMessage(message, "", "");
    });
  });

  authForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    showMessage(message, "", "");

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      showMessage(message, "error", "Please fill all required fields");
      return;
    }

    try {
      const url = mode === "login" ? `${API_BASE}/auth/login` : `${API_BASE}/auth/register`;
      const body = mode === "login"
        ? { email, password }
        : { name: nameInput.value.trim(), email, password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await parseResponse(res);

      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/jobs.html";
      } else {
        showMessage(message, "error", "Authentication failed");
      }
    } catch (err) {
      showMessage(message, "error", err.message);
    }
  });
}

if (document.getElementById("job-form")) {
  const jobForm = document.getElementById("job-form");
  const message = document.getElementById("message");
  const jobsList = document.getElementById("jobs-list");
  const companyInput = document.getElementById("company");
  const positionInput = document.getElementById("position");
  const statusInput = document.getElementById("status");
  const submitBtn = document.getElementById("submitJobBtn");
  const resetBtn = document.getElementById("resetBtn");
  const refreshBtn = document.getElementById("refreshBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const formTitle = document.getElementById("formTitle");

  let editingId = null;

  if (!getToken()) {
    window.location.href = "/index.html";
  }

  async function loadJobs() {
    try {
      const res = await fetch(`${API_BASE}/jobs`, {
        headers: authHeaders()
      });

      const data = await parseResponse(res);
      renderJobs(data.jobs || data);
    } catch (err) {
      showMessage(message, "error", err.message);
    }
  }

  function renderJobs(jobs) {
    if (!jobs || jobs.length === 0) {
      jobsList.innerHTML = `<div class="empty">No jobs yet. Add your first one.</div>`;
      return;
    }

    jobsList.innerHTML = jobs.map((job) => `
      <div class="job-card">
        <div class="job-top">
          <div>
            <div class="job-title">${job.position}</div>
            <div class="job-company">${job.company}</div>
          </div>
          <span class="status-pill ${job.status || "pending"}">${job.status || "pending"}</span>
        </div>

        <div class="job-actions">
          <button class="btn secondary edit-btn" data-id="${job._id}">Edit</button>
          <button class="btn ghost delete-btn" data-id="${job._id}">Delete</button>
        </div>
      </div>
    `).join("");

    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", () => startEdit(btn.dataset.id));
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", () => deleteJob(btn.dataset.id));
    });
  }

  function startEdit(id) {
    const job = Array.from(document.querySelectorAll(".job-card")).find((card) => {
      const btn = card.querySelector(".edit-btn");
      return btn && btn.dataset.id === id;
    });

    if (!job) return;

    const title = job.querySelector(".job-title")?.textContent || "";
    const company = job.querySelector(".job-company")?.textContent || "";
    const status = job.querySelector(".status-pill")?.textContent || "pending";

    companyInput.value = company;
    positionInput.value = title;
    statusInput.value = status;

    editingId = id;
    formTitle.textContent = "Edit job";
    submitBtn.textContent = "Update Job";
  }

  async function deleteJob(id) {
    if (!confirm("Delete this job?")) return;

    try {
      const res = await fetch(`${API_BASE}/jobs/${id}`, {
        method: "DELETE",
        headers: authHeaders()
      });

      const data = await parseResponse(res);
      showMessage(message, "success", data.msg || "Job deleted");
      loadJobs();
    } catch (err) {
      showMessage(message, "error", err.message);
    }
  }

  jobForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const company = companyInput.value.trim();
    const position = positionInput.value.trim();
    const status = statusInput.value;

    if (!company || !position) {
      showMessage(message, "error", "Company and position are required");
      return;
    }

    try {
      const payload = { company, position, status };
      const url = editingId ? `${API_BASE}/jobs/${editingId}` : `${API_BASE}/jobs`;
      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(payload)
      });

      const data = await parseResponse(res);

      showMessage(message, "success", data.msg || "Job saved successfully");
      jobForm.reset();
      statusInput.value = "pending";
      editingId = null;
      formTitle.textContent = "Add a new job";
      submitBtn.textContent = "Save Job";
      loadJobs();
    } catch (err) {
      showMessage(message, "error", err.message);
    }
  });

  resetBtn.addEventListener("click", () => {
    jobForm.reset();
    statusInput.value = "pending";
    editingId = null;
    formTitle.textContent = "Add a new job";
    submitBtn.textContent = "Save Job";
    showMessage(message, "", "");
  });

  refreshBtn.addEventListener("click", loadJobs);
  logoutBtn.addEventListener("click", logout);

  loadJobs();
}