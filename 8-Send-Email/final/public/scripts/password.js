// Password Reset page - Form Handler
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const email = document.getElementById('email').value.trim();

    // Validation
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Add loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch('/api/v1/auth/login/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Request failed');
      }

      // Show success message
      alert(
        'Password reset link has been sent to your email. Please check your inbox.'
      );

      // Clear form
      form.reset();

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        window.location.href = '/html/login.html';
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send reset link: ' + error.message);
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });
});
