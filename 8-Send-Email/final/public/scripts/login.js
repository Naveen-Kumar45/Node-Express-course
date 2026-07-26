// Login page - Form Handler
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById('name').value.trim(),
      password: document.getElementById('password').value,
    };

    // Validation
    if (!formData.name || !formData.password) {
      alert('Please enter name and password');
      return;
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
        throw new Error(data.msg || 'Login failed');
      }

      // Store token in localStorage
      localStorage.setItem('token', data.token);

      // Show success message
      alert('Login successful!');

      // Redirect to dashboard
      // window.location.href = '/dashboard';
      console.log('User logged in:', data.user);
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed: ' + error.message);
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });
});
