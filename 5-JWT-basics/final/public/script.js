let loginForm = document.getElementById('loginForm')
let loginID = document.getElementById('loginUsername')
let loginMsg = document.getElementById('loginMsg')
let password = document.getElementById('password')
let registerForm = document.getElementById('registerForm') 
let registerUsername = document.getElementById('registerUsername')
let registerEmail = document.getElementById('registerEmail')
let registerRole = document.getElementById('registerRole')
let registerMsg = document.getElementById('registerMsg')
let dashboard = document.getElementById('dashboardContent')
let togglePassword = document.getElementById("togglePassword")


 
if (password && togglePassword) { // Check if both elements exist before adding the event listener and toggling the password visibility

    togglePassword.addEventListener("click", () => {

        const isPassword = password.type === "password" // Check if the current type is "password"
        password.type= isPassword ? "text" : "password" // Toggle the type between "text" and "password"
 
        togglePassword.classList.toggle("fa-eye"); 
        togglePassword.classList.toggle("fa-eye-slash");

    });

}

function startLoading(button, text) {

    button.disabled = true;

    button.innerHTML = `
        <span class="spinner"></span>
        ${text}
    `;
}

function stopLoading(button, text) {

    button.disabled = false;

    button.textContent = text;
}


if (registerForm){

    let registerButton = registerForm.querySelector("button");

    registerForm.addEventListener('submit', async(event)=>{ // Add an event listener for the form submission and here event is passed as an argument to the callback function which is used to prevent the default form submission behavior and also used to access the form data and send it to the server using an asynchronous function
    registerMsg.textContent = ""   
    event.preventDefault() // Prevent the default form submission behavior

    let user = {
        name : registerUsername.value.trim(),
        email : registerEmail.value.trim(),
        password : password.value.trim(),
        role : registerRole.value.trim()
    }

    startLoading(registerButton,"Registering...")
    try {
        const data = await axios.post("/api/v1/register",user) // Send a POST request to the server with the user data
        console.log(data)
        registerMsg.textContent = data.data.msg // Display the success message from the server response
        
        let token = data.data.token // Extract the token from the server response
        localStorage.setItem("token",`Bearer ${token}`) // Store the token in localStorage for future requests

        setTimeout(()=>{
            window.location.href = "dashboard.html";
        },3000)

        
    }
    catch(err){
        registerMsg.textContent = err.response.data // Display the error message from the server response
        console.log("Response:", err.response);
        stopLoading(registerButton, "Register");
       
    }

});
}

if (loginForm){
    let loginButton = loginForm.querySelector('button')

    loginForm.addEventListener('submit', async(event)=>{ // Add an event listener for the form submission and here event is passed as an argument to the callback function which is used to prevent the default form submission behavior and also used to access the form data and send it to the server using an asynchronous function
    loginMsg.textContent = ""   
    event.preventDefault() // Prevent the default form submission behavior

    let user = {
        password : password.value.trim()
    }

    if (loginID.value.includes('@')){
        user.email = loginID.value.trim()
    }else{
        user.name = loginID.value.trim()
    }
    
    startLoading(loginButton,"Signing In....")

    try{
        const data = await axios.post('/api/v1/login',user)
        loginMsg.textContent = data.data.msg
        console.log(data)

        let token = data.data.token
        localStorage.setItem("token", `Bearer ${token}`)

        setTimeout(()=>{
            window.location.href = "dashboard.html"
        },3000)
    }
    catch(err){
        loginMsg.textContent=err.response.data
        console.log("Response:", err.response); 
        stopLoading(loginButton,"Login")
    }
})
};


if (dashboard){

    const displayDashboard = async ()=>{
        const token = localStorage.getItem('token')

        try{
            const response = await axios.get('/api/v1/dashboard',{
            headers : {
                Authorization : token
            }})


        const user = response.data

        const userName = document.getElementById('userName')
        userName.textContent = `👤 ${user.name}`

        const issuedAt = new Date(user.iat * 1000).toLocaleString();
        const expiresAt = new Date(user.exp * 1000).toLocaleString();

        const roleIcon = user.role === "admin" ? "🛡️" : "👤";

        dashboard.innerHTML = `
        <div class='welcome-card'>
            <h2>Welcome, ${user.name} 👋</h2>
            <p>Here's your account overview</p>
        </div>
        <div class="dashboard-grid">

        <!-- User Information -->

        <div class="dashboard-card">

            <h3>User Information</h3>

            <div class="info-row">
                <span>👤 Username</span>
                <span>${user.name}</span>
            </div>


            <div class="info-row">
                <span>📧 Email</span>
                <span>${user.email}</span>
            </div>


            <div class="info-row">
                <span>🏷️ Role</span>
                <span class="role-badge">${roleIcon} ${user.role.toUpperCase()}</span>
            </div>

        </div>

        <!-- Authentication Information -->

        <div class="dashboard-card">

            <h3>Authentication Information</h3>

            <div class="status success">
                ✔ Login Successful
            </div>

            <div class="info-row">
                <span>🔒 Authentication</span>
                <span>JWT</span>
            </div>

            <div class="info-row">
                <span>🟢 Status</span>
                <span class="active-status">Authenticated</span>
            </div>

            <div class="info-row">
                <span>🕒 Issued At</span>
                <span>${issuedAt}</span>
            </div>
            
            <div class="info-row">
                <span>⏰ Expires At</span>
                <span>${expiresAt}</span>
            </div>

            <div class="info-row">
                <span>💻 Session</span>
                <span>Active</span>
            </div>

        </div>

        </div>` 
        }
        catch(err){
            console.error(err);
            localStorage.removeItem("token");
            window.location.href = "index.html";
        }
}

displayDashboard()
}

const logout = document.getElementById('logout')

if (logout){
    logout.addEventListener('click',  () => {
        localStorage.removeItem('token');
        window.location.href = "index.html";
    })
}





