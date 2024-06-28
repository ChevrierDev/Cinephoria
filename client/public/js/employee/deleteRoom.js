document.addEventListener("DOMContentLoaded", () => {

    const selectTheaterBtn = document.getElementById("select-theater");
    const openTheaterMenu = document.getElementById("theater-menu");
    const theaterListItems = document.querySelectorAll("#theater-list li");
    const cinemaChoosen = document.getElementById("cinema-choosen");

    const openAlertBtn = document.getElementById("open-alert-btn");
    const alertMenu = document.getElementById("alert");
    const closeAlertBtn = document.getElementById("close-alert");

    const selectRoomsBtn = document.getElementById("select-room");
    const openRoomsMenu = document.getElementById("room-menu");
    const roomChoosen = document.getElementById("room-choosen");
    const roomListItem = document.querySelectorAll("#room-list li");
    const roomIdInput = document.getElementById("room-id");
    const currentRoomNameInput = document.getElementById("current-room-name");
    const roomListContainer = document.getElementById("room-list");

    const submitFormBtn = document.getElementById("submit-form");

    const closeAllMenus = () => {
      openTheaterMenu.classList.add("hidden");
      openRoomsMenu.classList.add("hidden");
    };

    selectTheaterBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const isHidden = openTheaterMenu.classList.contains("hidden");
      closeAllMenus();
      if (isHidden) {
        openTheaterMenu.classList.toggle("hidden");
      }
    });

    selectRoomsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const isHidden = openRoomsMenu.classList.contains("hidden");
      closeAllMenus();
      if (isHidden) {
        openRoomsMenu.classList.toggle("hidden");
      }
    });

    theaterListItems.forEach((item) => {
      item.addEventListener("click", () => {
        cinemaChoosen.textContent = item.textContent;
        openTheaterMenu.classList.add("hidden");

        const selectedCinemaId = item.dataset.cinemaId;

        fetch(`/api/v1/getRoomsByCinema/${selectedCinemaId}`)
          .then((response) => response.json())
          .then((data) => {
            roomListContainer.innerHTML = "";
            if (data.rooms && data.rooms.length > 0) {
              data.rooms.forEach((room) => {
                const li = document.createElement("li");
                li.textContent = room.name;
                li.classList.add(
                  "list-none",
                  "hover:translate-x-5",
                  "duration-200",
                  "ease-out",
                  "cursor-pointer",
                  "hover:text-goldOne",
                  "hover:scale-105"
                );
                li.dataset.roomId = room.room_id;
                li.dataset.roomName = room.name;
                roomListContainer.appendChild(li);

                li.addEventListener("click", () => {
                  roomChoosen.textContent = room.name;
                  roomIdInput.value = room.room_id;
                  currentRoomNameInput.value = room.name;
                  openRoomsMenu.classList.add("hidden");
                });
              });
            } else {
              const noRoomsMessage = document.createElement("p");
              noRoomsMessage.textContent = "Aucune Salle";
              noRoomsMessage.classList.add(
                "text-center",
                "font-arvo",
                "text-white",
                "font-bold",
                "text-3xl",
                "w-fit"
              );
              roomListContainer.appendChild(noRoomsMessage);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            showError(
              "Une erreur s'est produite lors de la récupération des salles."
            );
          });
      });
    });

    openAlertBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const currentRoomName = currentRoomNameInput.value || "SALLE";
      document.getElementById("alert-message").textContent =
        `VOULEZ-VOUS VRAIMENT SUPPRIMER LA SALLE ${currentRoomName} ?`;
      alertMenu.classList.toggle("hidden");
      alertMenu.classList.toggle("flex");
    });

    closeAlertBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alertMenu.classList.toggle("hidden");
      alertMenu.classList.toggle("flex");
    });

    submitFormBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      const roomId = roomIdInput.value;

      try {
        const response = await fetch(`/api/v1/rooms/${roomId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        localStorage.setItem("success-msg", "Salle supprimée avec succès");
        window.location.href = "/dashboard/employee/rooms";
      } catch (error) {
        console.error("Error:", error);
        showError(
          "Une erreur s'est produite lors de la suppression de la salle."
        );
      }

      alertMenu.classList.toggle("hidden");
      alertMenu.classList.toggle("flex");
    });
  }
);
