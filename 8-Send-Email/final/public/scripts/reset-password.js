document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form')
  const submitBtn = form.querySelector('button[type="submit"]')
  const params = new URLSearchParams(window.location.search)
  const token = params.get('token')

  if (!token) {
    showMessage('Missing reset token. Please use the password reset link from your email.', 'error')
    submitBtn.disabled = true
    return
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const newpassword = document.getElementById('newpassword').value.trim()
    const confirmpassword = document.getElementById('confirmpassword').value.trim()

    clearMessage();

    if (!newpassword || !confirmpassword) {
      showMessage('Please enter both password fields.', 'error')
      return
    }

    if (newpassword.length < 8) {
      showMessage('Password must be at least 8 characters long.', 'error')
      return
    }

    if (newpassword !== confirmpassword) {
      showMessage('Passwords do not match. Please check both fields.', 'error')
      return
    }

    submitBtn.classList.add('loading')
    submitBtn.disabled = true

    try {
      const response = await fetch('/api/v1/auth/resetpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newpassword, confirmpassword }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.msg || 'Failed to reset password')
      }

      showMessage('Your password has been updated. Redirecting to login page...', 'success')
      form.reset()
      setTimeout(() => {
        window.location.href = '/html/login.html'
      }, 2500)
    } catch (error) {
      console.error('Reset error:', error)
      showMessage(error.message || 'Password reset failed. Please try again.', 'error')
    } finally {
      submitBtn.classList.remove('loading')
      submitBtn.disabled = false
    }
  })
})
