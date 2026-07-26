// Verify page - OTP Input Handler
document.addEventListener('DOMContentLoaded', () => {
  const otpBoxes = document.querySelectorAll('.otp-box');
  const verifyForm = document.getElementById('verify-form');
  const verifyBtn = document.querySelector('.verify-btn');
  const resendBtn = document.querySelector('.resend-btn');
  const emailInput = document.getElementById('email');

  // Pre-populate email from registration
  const registeredEmail = sessionStorage.getItem('registeredEmail');
  if (registeredEmail) {
    emailInput.value = registeredEmail;
  } else {
    emailInput.placeholder = 'Email not found';
  }

  // Auto-focus and move between OTP boxes
  otpBoxes.forEach((box, index) => {
    box.addEventListener('input', (e) => {
      const value = e.target.value;

      // Only allow numbers
      if (!/^\d$/.test(value) && value !== '') {
        e.target.value = '';
        return;
      }

      // Mark as filled
      if (value) {
        box.classList.add('filled');
      } else {
        box.classList.remove('filled');
      }

      // Move to next box
      if (value && index < otpBoxes.length - 1) {
        otpBoxes[index + 1].focus();
      }
    });

    // Handle backspace
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !e.target.value && index > 0) {
        otpBoxes[index - 1].focus();
      }
    });

    // Handle paste
    box.addEventListener('paste', (e) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text').slice(0, 6);
      const digits = pastedData.replace(/\D/g, '').split('');

      digits.forEach((digit, i) => {
        if (i < otpBoxes.length) {
          otpBoxes[i].value = digit;
          otpBoxes[i].classList.add('filled');
        }
      });

      if (digits.length > 0) {
        otpBoxes[Math.min(digits.length, otpBoxes.length - 1)].focus();
      }
    });
  });

  // Get OTP value
  function getOTPValue() {
    return Array.from(otpBoxes)
      .map((box) => box.value)
      .join('');
  }

  // Verify button handler
  verifyBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const otp = getOTPValue();

    if (otp.length !== 6) {
      alert('Please enter all 6 digits');
      return;
    }

    // Add loading state
    verifyBtn.classList.add('loading');
    verifyBtn.disabled = true;

    try {
      // TODO: Add your verification API call here
      console.log('Verifying OTP:', otp);

      // Example API call (replace with your endpoint)
      const response = await fetch('/api/v1/auth/register/verifyemail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp })
       });
      const data = await response.json();

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert('Email verified successfully!');
      // Redirect to dashboard or home page
      // window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error:', error);
      alert('Verification failed. Please try again.');
    } finally {
      verifyBtn.classList.remove('loading');
      verifyBtn.disabled = false;
    }
  });

  // Resend button handler
  resendBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    resendBtn.classList.add('loading');
    resendBtn.disabled = true;

    try {
      // TODO: Add your resend OTP API call here
      console.log('Resending OTP');

      // Example API call (replace with your endpoint)
      const response = await fetch('/api/v1/auth/verifyemail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert('OTP resent to your email!');

      // Clear OTP boxes
      otpBoxes.forEach((box) => {
        box.value = '';
        box.classList.remove('filled');
      });

      // Focus first box
      otpBoxes[0].focus();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to resend OTP. Please try again.');
    } finally {
      resendBtn.classList.remove('loading');
      resendBtn.disabled = false;
    }
  });
});
