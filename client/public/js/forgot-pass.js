document.getElementById('forgotPass-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const emailInput = document.getElementById('forgotPass-email');
    const emailError = document.getElementById('email-error');
    const emailValue = emailInput.value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailPattern.test(emailValue)) {
        emailError.style.display = 'block';
        return;
    } else {
        emailError.style.display = 'none';
    }

    try {
        const response = await fetch('/api/v1/send-temp-pass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: emailValue })
        });
        const result = await response.json();
        if (response.status === 200) {
            localStorage.setItem('loginMessage', result.message);
            window.location.href = '/login';
        } else {
            emailError.textContent = result.error;
            emailError.style.display = 'block';
        }
    } catch (err) {
        console.error('Error:', err);
    }
});