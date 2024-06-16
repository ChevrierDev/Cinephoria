document.getElementById('reset-pass-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const passwordInput = document.getElementById('newPassword');
    const passwordValue = passwordInput.value;
    const userId = document.getElementById('userId').value; 
    const errorMessage = document.getElementById('error-message');
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_\u2014\u2013])[A-Za-z\d!@#$%^&*()\-_\u2014\u2013]{8,}$/;

    // Validate the password
    if (!passwordRegex.test(passwordValue)) {
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
        return;
    } else {
        errorMessage.style.display = 'none';
    }

    try {
        const response = await fetch("/api/v1/change-pass", {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userId, newPassword: passwordValue}) 
        });
        const result = await response.json();
        if (response.status === 200) {
            window.location.href = '/login';
        } else {
            console.log("Error while switching");
        }
    } catch (err) {
        console.error('Error:', err);
    }
});
