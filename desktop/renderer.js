document.addEventListener("DOMContentLoaded", async () => {
  const currentPage = document.body.getAttribute("data-page");
  if (currentPage === "login") {
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
          console.log(result)
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

              // Store the token and user info if necessary
              const token = result.token;
              const user = result.user;
              if (token) {
                localStorage.setItem("authToken", token);
              }
              if (user && user.first_name) {
                localStorage.setItem("userName", user.first_name);
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
  } else {
    const userName = localStorage.getItem("userName");
    if (userName) {
      document.getElementById("user-name").innerText = userName;
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
            localStorage.removeItem("userName");
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
    const openTheaterFilterBtn = document.getElementById(
      "theater-filter-button"
    );
    const theaterFilterMenu = document.getElementById("theater-filter-menu");

    openTheaterFilterBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const isHidden = theaterFilterMenu.classList.contains("hidden");
      closeAllMenu();
      closeAllList();
      if (isHidden) {
        theaterFilterMenu.classList.toggle("hidden");
      }
    });

    let cinemaId = null;
    let roomId = null;
    let seatId = null;

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
        const cinemaItem = document.createElement("button");
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
          "tracking-wide"
        );
        // Add data-cinema-id attribute with cinema ID
        cinemaItem.dataset.cinemaId = cinema.cinema_id;
        theaterFilterMenu.appendChild(cinemaItem);

        // Add event listener to the newly created item
        cinemaItem.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation(); // Prevent event from bubbling up
          document.getElementById("text-content").innerText = cinema.name;
          theaterFilterMenu.classList.add("hidden");
          cinemaId = cinema.cinema_id;
          fetchRoomsData(cinemaId);
        });
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des cinémas:", error);
    }

    //open intervention menu feature
    const openInterventionBtn = document.getElementById(
      "open-incident-menu-button"
    );
    const interventionMenu = document.getElementById("intervention-form-menu");
    const closeInterventionBtn = document.getElementById(
      "close-intervention-form-menu"
    );

    //close All menu if needed
    const closeAllMenu = () => {
      interventionMenu.classList.add("hidden");
      interventionMenu.classList.remove("flex");
      theaterFilterMenu.classList.add("hidden");
    };

    //close all list open if needed
    const closeAllList = () => {
      seatsMenu.classList.add("hidden");
      roomsMenu.classList.add("hidden");
    };

    openInterventionBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isHidden = interventionMenu.classList.contains("hidden");
      closeAllMenu();
      closeAllList();
      if (isHidden) {
        interventionMenu.classList.toggle("hidden");
        interventionMenu.classList.toggle("flex");
      }
    });

    closeInterventionBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeAllList();
      interventionMenu.classList.add("hidden");
      interventionMenu.classList.remove("flex");
    });

    //select rooms list dropdown feature
    const roomsListBtn = document.getElementById("select-rooms");
    const roomsMenu = document.getElementById("rooms-menu");
    const roomsList = document.getElementById("rooms-list");
    const roomChoosen = document.getElementById("rooms-choosen");

    //toggle rooms menu
    roomsListBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const isHidden = roomsMenu.classList.contains("hidden");
      closeAllList();
      if (isHidden) {
        roomsMenu.classList.toggle("hidden");
      }
    });

    //get rooms liste text content
    roomsList.addEventListener("click", (e) => {
      // Changed to single event listener for UL
      if (e.target.tagName === "LI") {
        // Ensure it's an LI element
        e.preventDefault();
        roomChoosen.innerText = e.target.textContent;
      }
    });
    //select seats list dropdown feature
    const seatsListBtn = document.getElementById("select-seats");
    const seatsMenu = document.getElementById("seats-menu");
    const seatsList = document.getElementById("seats-list");
    const seatChoosen = document.getElementById("seats-choosen");

    //toggle seats menu
    seatsListBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const isHidden = seatsMenu.classList.contains("hidden");
      closeAllList();
      if (isHidden) {
        seatsMenu.classList.toggle("hidden");
      }
    });

    //get seats liste text content
    seatsList.addEventListener("click", (e) => {
      // Changed to single event listener for UL
      if (e.target.tagName === "LI") {
        // Ensure it's an LI element
        e.preventDefault();
        seatChoosen.innerText = e.target.textContent;
      }
    });

    //GET room By API DATA
    async function fetchRoomsData(cinemaId) {
      try {
        const response = await fetch(
          `http://localhost:3030/api/v1/getRoomsByCinema/${cinemaId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-electron-request": "true",
            },
          }
        );
        const data = await response.json();

        const roomsArray = data.rooms;

        // Vider la liste des salles avant d'ajouter de nouvelles salles
        roomsList.innerHTML = "";

        roomsArray.forEach((room) => {
          const li = document.createElement("li");
          li.classList.add("hover:bg-goldOne", "pl-5");

          li.innerText = room.name;
          roomsList.appendChild(li);

          li.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            roomChoosen.innerText = room.name;
            roomChoosen.setAttribute("data-room-id", room.room_id);
            roomsMenu.classList.add("hidden");
            roomId = room.room_id;
            fetchSeatsData(roomId);
          });
        });
      } catch (err) {
        console.error(
          "Erreur lors de la récupération des données pour les salles",
          err
        );
      }
    }

    //GET seats By API DATA
    async function fetchSeatsData(roomId) {
      try {
        const response = await fetch(
          `http://localhost:3030/api/v1/seatsByRooms/${roomId}`,
          {
            method: "GET",
            headers: {
              "Content-type": "Application/json",
              "x-electron-request": "true",
            },
          }
        );

        const data = await response.json();
        const seats = data;

        seatsList.innerHTML = "";
        seats.forEach((seat) => {
          const li = document.createElement("li");
          li.classList.add("hover:bg-goldOne", "pl-5");
          li.innerText = seat.seat_label;
          seatsList.appendChild(li);
          li.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            seatChoosen.innerText = seat.seat_label;
            seatChoosen.setAttribute("data-seat-id", seat.seat_id);
            seatId = seat.seat_id;
            seatsMenu.classList.add("hidden");
          });
        });
      } catch (err) {
        console.error(
          "Erreur lors de la récupération des données pour les sièges",
          err
        );
      }
    }

    // Function to post new intervention
    async function postIntervention() {
      try {
        const roomId = roomChoosen.getAttribute("data-room-id");
        const seatId = seatChoosen.getAttribute("data-seat-id");
        const description = document.getElementById(
          "intervention-description"
        ).value;

        if (!roomId || !seatId || !description) {
          console.error("Tous les champs requis ne sont pas remplis !");
          window.Toastify.toast({
            text: "Tous les champs requis ne sont pas remplis !",
            duration: 3000,
            close: false,
            gravity: "top",
            style: {
              background: "red",
              color: "white",
              textAlign: "center",
            },
          });
          return;
        }

        const response = await fetch("http://localhost:3030/api/v1/incident", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-electron-request": "true",
          },
          body: JSON.stringify({
            room_id: roomId,
            seat_id: seatId,
            description: description,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Intervention créée :", result);
          window.Toastify.toast({
            text: "Intervention créée avec succès !",
            duration: 3000,
            close: false,
            gravity: "top",
            style: {
              background: "green",
              color: "white",
              textAlign: "center",
            },
          });
          // Optionally close the form or reset it
          interventionMenu.classList.add("hidden");
          interventionMenu.classList.remove("flex");
          window.location.reload();
        } else {
          console.error("Erreur lors de la création de l'intervention");
          window.Toastify.toast({
            text: "Erreur lors de la création de l'intervention",
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
      } catch (err) {
        console.error(
          "Une erreur s'est produite lors de la création de l'intervention",
          err
        );
        window.Toastify.toast({
          text: "Erreur lors de la création de l'intervention",
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
    }

    // Attach the event listener to the submit button
    const submitFormBtn = document.getElementById("submit-intervention-form");
    submitFormBtn.addEventListener("click", (e) => {
      e.preventDefault();
      postIntervention();
    });

    const todayInterventionDate = document.getElementById(
      "today-intervention-date"
    );
    const currentDate = new Date();
    todayInterventionDate.innerText = currentDate.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });

    // Function to fetch and display incidents
    async function fetchAndDisplayIncidents() {
      try {
        const response = await fetch("http://localhost:3030/api/v1/incident", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-electron-request": "true",
          },
        });
        const incidents = await response.json();

        if (response.ok && incidents.length > 0) {
          const interventionContainer = document.getElementById(
            "intervention-container"
          );
          interventionContainer.innerHTML = "";

          incidents.forEach((incident) => {
            const incidentCard = document.createElement("div");
            incidentCard.classList.add(
              "w-fit",
              "flex",
              "flex-col",
              "cursor-pointer",
              "hover:scale-105",
              "hover:duration-500",
              "hover:ease-in-out"
            );

            const incidentImage = document.createElement("img");
            incidentImage.src = `http://localhost:3030/uploads/${incident.cinema_image}`;
            incidentImage.classList.add("object-cover");
            incidentImage.width = 250;
            incidentImage.height = 290;
            incidentImage.alt = "cinéma photo";

            const incidentDetail = document.createElement("div");
            incidentDetail.classList.add(
              "min-h-14",
              "bg-black",
              "flex",
              "flex-col",
              "items-start",
              "px-2",
              "py-2"
            );

            const theaterName = document.createElement("h2");
            theaterName.classList.add(
              "font-arvo",
              "text-lg",
              "font-bold",
              "text-white",
              "tracking-wide"
            );
            theaterName.innerText = incident.cinema_name;

            const incidentDescription = document.createElement("p");
            incidentDescription.classList.add(
              "font-arvo",
              "text-sm",
              "text-white/65",
              "tracking-wide"
            );
            incidentDescription.innerText = incident.description;

            const roomName = document.createElement("p");
            roomName.classList.add(
              "font-arvo",
              "text-sm",
              "text-white/65",
              "tracking-wide"
            );
            roomName.innerText = `Salle ${incident.room_name}`;

            const seatLabel = document.createElement("p");
            seatLabel.classList.add(
              "font-arvo",
              "text-sm",
              "text-white/65",
              "tracking-wide"
            );
            seatLabel.innerText = `Siège ${incident.seat_label}`;

            incidentDetail.appendChild(theaterName);
            incidentDetail.appendChild(incidentDescription);
            incidentDetail.appendChild(roomName);
            incidentDetail.appendChild(seatLabel);

            incidentCard.appendChild(incidentImage);
            incidentCard.appendChild(incidentDetail);

            interventionContainer.appendChild(incidentCard);
          });
        } else {
          console.log("Aucun incident trouvé !");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des incidents:", error);
      }
    }

    fetchAndDisplayIncidents();
  }
});
