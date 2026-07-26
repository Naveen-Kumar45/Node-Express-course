// Register page - Form Handler
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      password: document.getElementById('password').value,
      contact: document.getElementById('contact').value.trim(),
    };

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.contact) {
      alert('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Password validation (at least 6 characters)
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[0-9+\-\s()]+$/;
    if (!phoneRegex.test(formData.contact)) {
      alert('Please enter a valid phone number');
      return;
    }

    // Add loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Registration failed');
      }

      // Store email in session/localStorage for verify page
      sessionStorage.setItem('registeredEmail', formData.email);

      // Show success message
      alert('Account created! Redirecting to verification...');

      // Redirect to verify page
      window.location.href = '/html/verify.html';
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed: ' + error.message);
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });
});
