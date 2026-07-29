// Login page - Form Handler
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
      email: document.getElementById('email').value.trim(),
      password: document.getElementById('password').value,
    };

    clearMessage();

    // Validation
    if (!formData.email || !formData.password) {
      showMessage('Please enter email and password', 'error');
      return;
    }

    if (formData.email !== formData.email.toLowerCase()) {
    return showMessage(
        "Please enter your email in lowercase.",
        "error"
    );
    }

    // Add loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.verified === false) {
          sessionStorage.setItem('verificationToken', data.verificationToken);
          sessionStorage.setItem('registeredEmail', formData.email);
          showMessage(data.message || 'Your email is not verified. Redirecting to verification page.', 'error');
          window.location.href = '/html/verify.html';
          return;
        }

        throw new Error(data.msg || 'Login failed');
      }

      // Store token in localStorage
      localStorage.setItem('token', data.token);

      // Show success message
      showMessage('Login successful!', 'success');

      // Redirect to dashboard or home page
      // window.location.href = '/dashboard';
      console.log('User logged in:', data.user);
    } catch (error) {
      console.error('Error:', error);
      showMessage('Login failed: ' + error.message, 'error');
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });
});
