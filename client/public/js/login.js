document.addEventListener("DOMContentLoaded", function () {
  const loginMessage = document.getElementById("login-message");
  const message = localStorage.getItem("loginMessage");
  if (message) {
    loginMessage.textContent = message;
    loginMessage.classList.remove("hidden");
    loginMessage.classList.add("block");
    setTimeout(() => {
      loginMessage.classList.remove("block");
      loginMessage.classList.add("hidden");
      localStorage.removeItem("loginMessage");
    }, 5000);
  }

  const errorContainer = document.getElementById("error-container");
  if (errorContainer && !errorContainer.classList.contains("hidden")) {
    setTimeout(() => {
      errorContainer.classList.add("hidden");
    }, 3000);
  }
});
