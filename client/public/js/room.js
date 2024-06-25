const currentPage = window.location.pathname;

if (currentPage === "/dashboard/admin/rooms/add") {
  document.addEventListener("DOMContentLoaded", () => {
    const selectTheaterBtn = document.getElementById("select-theater");
    const openTheaterMenu = document.getElementById("theater-menu");
    const theaterListItems = document.querySelectorAll("#theater-list li");
    const cinemaChoosen = document.getElementById("cinema-choosen");

    const openAlertBtn = document.getElementById("open-alert-btn");
    const alertMenu = document.getElementById("alert");
    const closeAlertBtn = document.getElementById("close-alert");
    const submitFormBtn = document.getElementById("submit-form");

    const mainField = document.getElementById("main-field");
    const addSeatGroupBtn = document.getElementById("add-seat-group");
    const seatGroupsContainer = document.getElementById("seat-groups"); 
    const errorMessages = document.getElementById("error-messages"); 

    let selectedCinemaId = null;

    const closeMenu = () => {
        openTheaterMenu.classList.add("hidden");
    };

    const showError = (message) => {
        const errorMessage = document.createElement("li");
        errorMessage.textContent = message;
        errorMessages.appendChild(errorMessage);
    };

    const clearErrors = () => {
        errorMessages.innerHTML = "";
    };

    const validateInputs = () => {
        const seatLabels = document.querySelectorAll('.seat-label');
        const seatCounts = document.querySelectorAll('.seat-count');
        let allValid = true;
        let labelsSet = new Set();

        clearErrors();

        seatLabels.forEach((label, index) => {
            const normalizedLabel = label.value.trim().toLowerCase();
            if (normalizedLabel === '' || seatCounts[index].value.trim() === '') {
                allValid = false;
            }
            if (labelsSet.has(normalizedLabel)) {
                allValid = false;
                showError("Deux sièges ne peuvent pas avoir le même libellé.");
            }
            labelsSet.add(normalizedLabel);
        });

        addSeatGroupBtn.disabled = !allValid;
    };

    selectTheaterBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const isHidden = openTheaterMenu.classList.contains('hidden');
        closeMenu();
        if (isHidden) {
            openTheaterMenu.classList.toggle("hidden");
        }
    });

    theaterListItems.forEach((item) => {
        item.addEventListener("click", () => {
            selectedCinemaId = item.dataset.cinemaId; 
            cinemaChoosen.textContent = item.textContent;
            openTheaterMenu.classList.add("hidden");
            mainField.classList.remove("hidden");
        });
    });

    openAlertBtn.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("alert-message").textContent = `VOULEZ-VOUS VRAIMENT AJOUTER LA SALLE ${document.getElementById('room-name').value} ?`;
        alertMenu.classList.toggle("hidden");
        alertMenu.classList.toggle("flex");
    });

    closeAlertBtn.addEventListener("click", (e) => {
        e.preventDefault();
        alertMenu.classList.toggle("hidden");
        alertMenu.classList.toggle("flex");
    });

    // Ajouter un nouveau groupe de sièges
    addSeatGroupBtn.addEventListener("click", () => {
        const seatGroup = document.createElement("div");
        seatGroup.classList.add("seat-group", "flex", "items-center", "gap-x-2");

        seatGroup.innerHTML = `
            <input type="text" class="seat-label outline-none w-1/3 h-10 px-2 text-sm placeholder:text-blueOne placeholder:font-arvo placeholder:font-bold" placeholder="LIBELLÉ SIEGE" required>
            <input type="number" class="seat-count outline-none w-1/3 h-10 px-2 text-sm placeholder:text-blueOne placeholder:font-arvo placeholder:font-bold" placeholder="NOMBRE DE SIEGES" min="1" max="24" required>
            <select class="seat-accessibility outline-none w-1/3 h-10 px-2 font-arvo text-blueOne font-bold text-sm" required>
                <option value="true">Accessibilité: Oui</option>
                <option value="false">Accessibilité: Non</option>
            </select>
            <button type="button" class="remove-seat-group bg-redOne text-white w-5 h-5 flex items-center justify-center hover:bg-red-600 duration-200 hover:scale-95">-</button>
        `;

        // Ajouter le gestionnaire de suppression pour le bouton
        seatGroup.querySelector(".remove-seat-group").addEventListener("click", () => {
            seatGroup.remove();
            validateInputs();
        });

        // Ajouter les gestionnaires d'événements pour la validation
        seatGroup.querySelector('.seat-label').addEventListener('input', validateInputs);
        seatGroup.querySelector('.seat-count').addEventListener('input', validateInputs);

        seatGroupsContainer.appendChild(seatGroup);
        validateInputs(); // Valider les champs après l'ajout d'un nouveau groupe
    });

    // Ajouter les gestionnaires d'événements de validation initiaux
    document.querySelectorAll('.seat-label').forEach(label => label.addEventListener('input', validateInputs));
    document.querySelectorAll('.seat-count').forEach(count => count.addEventListener('input', validateInputs));

    // Initial validation
    validateInputs();

    // Soumission du formulaire
    submitFormBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        const roomName = document.getElementById('room-name').value;
        const roomQuality = document.getElementById('room-quality').value;
        const seatGroups = Array.from(document.querySelectorAll('.seat-group'));

        const seats = seatGroups.map(group => {
            return {
                seat_label: group.querySelector('.seat-label').value,
                count: group.querySelector('.seat-count').value,
                accessibility: group.querySelector('.seat-accessibility').value
            };
        });

        try {
            const response = await fetch('/api/v1/addRoomWithSeats', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cinema_id: selectedCinemaId,
                    name: roomName,
                    quality: roomQuality,
                    seats
                })
            });

            const data = await response.json();
            if (response.ok) {
              localStorage.setItem('succes-msg', 'Salle ajouter avec succès')
              window.location.href = data.redirectUrl;
            } else {
                showError(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            showError('Une erreur s\'est produite lors de l\'ajout de la salle et des sièges.');
        }

        alertMenu.classList.toggle("hidden");
        alertMenu.classList.toggle("flex");
    });
});

} else if (currentPage === "/dashboard/admin/rooms/update") {
  document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname === "/dashboard/admin/rooms/update") {
      const selectTheaterBtn = document.getElementById("select-theater");
      const openTheaterMenu = document.getElementById("theater-menu");
      const theaterListItems = document.querySelectorAll("#theater-list li");
      const cinemaChoosen = document.getElementById("cinema-choosen");

      const openAlertBtn = document.getElementById("open-alert-btn");
      const alertMenu = document.getElementById("alert");
      const closeAlertBtn = document.getElementById("close-alert");

      const selectRoomsBtn = document.getElementById("select-rooms");
      const openRoomsMenu = document.getElementById("room-menu");
      const roomChoosen = document.getElementById("room-choosen");
      const roomListItem = document.querySelectorAll("#room-list li");

      const selectQualitiesBtn = document.getElementById("select-quality");
      const qualitiesMenu = document.getElementById("quality-menu");
      const qualitieChoosen = document.getElementById("quality-choosen");
      const qualitieListItem = document.querySelectorAll("#quality-list li");

      const closeAllMenus = () => {
        openTheaterMenu.classList.add("hidden");
        openRoomsMenu.classList.add("hidden");
        qualitiesMenu.classList.add("hidden");
      };

      selectTheaterBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const isHidden = openTheaterMenu.classList.contains("hidden");
        closeAllMenus();
        if (isHidden) {
          openTheaterMenu.classList.toggle("hidden");
        }
      });

      theaterListItems.forEach((item) => {
        item.addEventListener("click", () => {
          cinemaChoosen.textContent = item.textContent;
          openTheaterMenu.classList.add("hidden");
        });
      });

      openAlertBtn.addEventListener("click", (e) => {
        e.preventDefault();
        scrollTo({
          top: 105,
          behavior: "smooth",
        });
        alertMenu.classList.toggle("hidden");
        alertMenu.classList.toggle("flex");
      });

      closeAlertBtn.addEventListener("click", (e) => {
        e.preventDefault();
        alertMenu.classList.toggle("hidden");
        alertMenu.classList.toggle("flex");
      });

      selectRoomsBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const isHidden = openRoomsMenu.classList.contains("hidden");
        closeAllMenus();
        if (isHidden) {
          openRoomsMenu.classList.toggle("hidden");
        }
      });

      roomListItem.forEach((item) => {
        item.addEventListener("click", () => {
          roomChoosen.textContent = item.textContent;
          openRoomsMenu.classList.add("hidden");
        });
      });

      selectQualitiesBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const isHidden = qualitiesMenu.classList.contains("hidden");
        closeAllMenus();
        if (isHidden) {
          qualitiesMenu.classList.toggle("hidden");
        }
      });

      qualitieListItem.forEach((item) => {
        item.addEventListener("click", () => {
          qualitieChoosen.textContent = item.textContent;
          qualitiesMenu.classList.add("hidden");
        });
      });
    }
  });
} else if (currentPage === "/dashboard/admin/rooms/delete") {
  document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname === "/dashboard/admin/rooms/delete") {
      const selectTheaterBtn = document.getElementById("select-theater");
      const openTheaterMenu = document.getElementById("theater-menu");
      const theaterListItems = document.querySelectorAll("#theater-list li");
      const cinemaChoosen = document.getElementById("cinema-choosen");

      const openAlertBtn = document.getElementById("open-alert-btn");
      const alertMenu = document.getElementById("alert");
      const closeAlertBtn = document.getElementById("close-alert");

      const selectRoomsBtn = document.getElementById("select-rooms");
      const openRoomsMenu = document.getElementById("room-menu");
      const roomChoosen = document.getElementById("room-choosen");
      const roomListItem = document.querySelectorAll("#room-list li");

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

      theaterListItems.forEach((item) => {
        item.addEventListener("click", () => {
          cinemaChoosen.textContent = item.textContent;
          openTheaterMenu.classList.add("hidden");
        });
      });

      openAlertBtn.addEventListener("click", (e) => {
        e.preventDefault();
        scrollTo({
          top: 105,
          behavior: "smooth",
        });
        alertMenu.classList.toggle("hidden");
        alertMenu.classList.toggle("flex");
      });

      closeAlertBtn.addEventListener("click", (e) => {
        e.preventDefault();
        alertMenu.classList.toggle("hidden");
        alertMenu.classList.toggle("flex");
      });

      selectRoomsBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const isHidden = openRoomsMenu.classList.contains("hidden");
        closeAllMenus();
        if (isHidden) {
          openRoomsMenu.classList.toggle("hidden");
        }
      });

      roomListItem.forEach((item) => {
        item.addEventListener("click", () => {
          roomChoosen.textContent = item.textContent;
          openRoomsMenu.classList.add("hidden");
        });
      });
    }
  });
} else {
  const succesMessage = localStorage.getItem('succes-msg');
  const confirmation = document.getElementById('confirmation-message');
  const confirmationTxt = document.getElementById('confirmation-text');

  if (succesMessage) {
    confirmationTxt.innerText = succesMessage
  }
  confirmation.classList.remove('hidden');

  setTimeout(() => {
    localStorage.removeItem('succes-msg');
    confirmation.classList.add('hidden');
  }, 6000);
}
