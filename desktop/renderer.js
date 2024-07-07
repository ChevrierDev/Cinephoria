document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".form");
  
    if (loginForm) { // Vérifie si l'élément existe avant d'ajouter l'événement
      loginForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Empêche la soumission du formulaire par défaut
  
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
  
        try {
          const response = await fetch("http://localhost:3030/api/v1/auth", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-electron-request": "true"
            },
            body: JSON.stringify({ email, password }),
            redirect: "manual" // Gère manuellement les redirections
          });
  
          const result = await response.json();
          if (response.ok) {
            window.Toastify.toast({
              text: "Connexion réussie!",
              duration: 3000,
              close: true,
              gravity: "top",
              position: "center",
              backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            });
  
            // Stocker le token si nécessaire
            const token = result.token;
            if (token) {
              localStorage.setItem('authToken', token);
            }
  
            // Rediriger l'utilisateur vers la page du tableau de bord de l'employé
            window.location.href = 'employeeDashboard.html';
          } else {
            const errorMessage = result.message || "Échec de la connexion, veuillez vérifier vos informations.";
            window.Toastify.toast({
              text: errorMessage,
              duration: 3000,
              close: true,
              gravity: "top",
              position: "center",
              backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
            });
          }
        } catch (error) {
          console.error("Erreur lors de la tentative de connexion", error);
          window.Toastify.toast({
            text: "Erreur lors de la tentative de connexion",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
          });
        }
      });
    }
  });
  