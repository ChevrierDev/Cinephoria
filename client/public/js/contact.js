document.addEventListener('DOMContentLoaded', () => {
    setTimeout(function() {
        const messageAlert = document.getElementById('message-alert');
        if (messageAlert) {
            messageAlert.style.transition = 'opacity 0.5s';
            messageAlert.style.opacity = '0';
            setTimeout(function() {
                messageAlert.remove();
            }, 500);
        }
    }, 2000); 
})