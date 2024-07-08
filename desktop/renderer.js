document.addEventListener("DOMContentLoaded", async () => {
  // Login functionality
  const loginForm = document.querySelector(".form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("http://localhost:3030/api/v1/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-electron-request": "true",
          },
          body: JSON.stringify({ email, password }),
          redirect: "manual",
        });

        const result = await response.json();
        if (response.ok) {
          window.Toastify.toast({
            text: "Connexion réussie!",
            duration: 3000,
            close: false,
            gravity: "top",
            style: {
              background: "green",
              color: "white",
              textAlign: "center",
            },
          });

          // Store the token if necessary
          const token = result.token;
          if (token) {
            localStorage.setItem("authToken", token);
          }

          // Redirect the user to the employee dashboard page
          window.location.href = "employeeDashboard.html";
        } else {
          const errorMessage =
            result.message ||
            "Échec de la connexion, veuillez vérifier vos informations.";
          window.Toastify.toast({
            text: errorMessage,
            duration: 3000,
            close: false,
            gravity: "top",
            style: {
              background: "red",
              color: "white",
              textAlign: "center",
            },
          });
        }
      } catch (error) {
        console.error("Erreur lors de la tentative de connexion", error);
        window.Toastify.toast({
          text: "Erreur lors de la tentative de connexion",
          duration: 3000,
          close: false,
          gravity: "top",
          style: {
            background: "red",
            color: "white",
            textAlign: "center",
          },
        });
      }
    });
  }

  // Logout functionality
  const logoutButton = document.getElementById("logoutBtn");
  if (logoutButton) {
    logoutButton.addEventListener("click", async (event) => {
      event.preventDefault();

      try {
        const success = await window.api.logout();
        if (success) {
          localStorage.removeItem("authToken");
          window.location.href = "login.html";
        } else {
          window.Toastify.toast({
            text: "Erreur lors de la tentative de déconnexion",
            duration: 3000,
            close: false,
            gravity: "top",
            style: {
              background: "red",
              color: "white",
              textAlign: "center",
            },
          });
        }
      } catch (error) {
        console.error("Erreur lors de la tentative de déconnexion", error);
        window.Toastify.toast({
          text: "Erreur lors de la tentative de déconnexion",
          duration: 3000,
          close: false,
          gravity: "top",
          style: {
            background: "red",
            color: "white",
            textAlign: "center",
          },
        });
      }
    });
  }

  // Theater filter dropdown functionality
  const openTheaterFilterBtn = document.getElementById("theater-filter-button");
  const theaterFilterMenu = document.getElementById("theater-filter-menu");

  openTheaterFilterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    theaterFilterMenu.classList.toggle("hidden");
  });

  try {
    const response = await fetch("http://localhost:3030/api/v1/cinemas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-electron-request": "true",
      },
    });
    const cinemas = await response.json();

    cinemas.forEach((cinema) => {
      const cinemaItem = document.createElement("li");
      cinemaItem.textContent = cinema.name;
      cinemaItem.classList.add(
        "py-2",
        "px-2",
        "w-full",
        "hover:bg-goldOne",
        "font-arvo",
        "font-bold",
        "text-blueOne",
        "cursor-pointer",
        "list-none",
        "tracking-wide"
      );
      // Add data-cinema-id attribute with cinema ID
      cinemaItem.dataset.cinemaId = cinema.cinema_id;
      theaterFilterMenu.appendChild(cinemaItem);

      // Add event listener to the newly created item
      cinemaItem.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();  // Prevent event from bubbling up
        document.getElementById("text-content").innerText = cinema.name;
        theaterFilterMenu.classList.add("hidden");
      });
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des cinémas:", error);
  }

});
