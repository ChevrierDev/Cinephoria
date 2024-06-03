document.addEventListener('DOMContentLoaded', function () {
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const formContainer = document.getElementById('form-container');

    loginLink.addEventListener('click', function (event) {
        event.preventDefault();
        loadForm('/components/login-form.ejs');
        setActiveLink(loginLink);
    });

    registerLink.addEventListener('click', function (event) {
        event.preventDefault();
        loadForm('/components/register-form.ejs');
        setActiveLink(registerLink);
    });

    function loadForm(form) {
        fetch(form)
            .then(response => response.text())
            .then(data => {
                formContainer.innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading form:', error);
            });
    }

    function setActiveLink(activeLink) {
        const links = document.querySelectorAll('.form-link');
        links.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }
});
