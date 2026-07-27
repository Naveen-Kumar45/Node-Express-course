document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form')
  const submitBtn = form.querySelector('button[type="submit"]')
  const params = new URLSearchParams(window.location.search)
  const token = params.get('token')

  if (!token) {
    alert('Missing reset token. Please use the password reset link from your email.')
    submitBtn.disabled = true
    return
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const newpassword = document.getElementById('newpassword').value.trim()
    const confirmpassword = document.getElementById('confirmpassword').value.trim()

    if (!newpassword || !confirmpassword) {
      alert('Please enter both password fields.')
      return
    }

    if (newpassword.length < 8) {
      alert('Password must be at least 8 characters long.')
      return
    }

    if (newpassword !== confirmpassword) {
      alert('Passwords do not match. Please check both fields.')
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

      alert('Your password has been updated. Redirecting to login page...')
      form.reset()
      setTimeout(() => {
        window.location.href = '/html/login.html'
      }, 2500)
    } catch (error) {
      console.error('Reset error:', error)
      alert(error.message || 'Password reset failed. Please try again.')
    } finally {
      submitBtn.classList.remove('loading')
      submitBtn.disabled = false
    }
  })
})
