const currentPage = window.location.pathname
if (currentPage === '/dashboard/admin/showtimes/select-movies') {
  document.addEventListener("DOMContentLoaded", () => {
    // Theater variable
    const theaterMenuBtn = document.getElementById("select-theater");
    const theaterList = document.querySelectorAll("#theater-list li");
    const choosenTheater = document.getElementById("cinema-choosen");
    const theaterMenu = document.getElementById("theater-menu");
    const cinemaIdInput = document.getElementById("cinema-id");
  
    // Rooms variables
    const roomsMenuBtn = document.getElementById("select-room");
    const roomsMenu = document.getElementById("room-menu");
    const choosenRooms = document.getElementById("room-choosen");
    const roomsList = document.querySelectorAll("#room-list li");
    const roomListContainer = document.getElementById("room-list");
    const roomIdInput = document.getElementById("room-id");
    const currentRoomNameInput = document.getElementById("current-room-name");
  
    // Confirmation & submit button variable
    const openAlertBtn = document.getElementById("open-alert-btn");
    const alertMenu = document.getElementById("alert");
    const closeAlertBtn = document.getElementById("close-alert");
    const submitFormBtn = document.getElementById("submit-form");
  
    // Store selected cinema ID
    let selectedCinemaId = null;
  
    // Store selected movie ID and duration
    let selectedMovieId = null;
    let selectedMovieDuration = 0;
  
    const closeAllMenu = () => {
      theaterMenu.classList.add("hidden");
      roomsMenu.classList.add("hidden");
    };
  
    // Theater dropdown menu
    theaterMenuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const isHidden = theaterMenu.classList.contains("hidden");
      closeAllMenu();
      if (isHidden) {
        theaterMenu.classList.toggle("hidden");
      }
    });
  
    // Selected Rooms within corresponding cinemas
    theaterList.forEach((item) => {
      item.addEventListener("click", () => {
        selectedCinemaId = item.dataset.cinemaId;
        choosenTheater.textContent = item.textContent;
        cinemaIdInput.value = selectedCinemaId;
        theaterMenu.classList.add("hidden");
  
        // Fetch rooms for the selected cinema
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
                  choosenRooms.textContent = room.name;
                  roomIdInput.value = room.room_id;
                  currentRoomNameInput.value = room.name;
                  roomsMenu.classList.add("hidden");
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
  
    // Rooms dropdown menu
    roomsMenuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const isHidden = roomsMenu.classList.contains("hidden");
      closeAllMenu();
      if (isHidden) {
        roomsMenu.classList.toggle("hidden");
      }
    });
  
    roomsList.forEach((room) => {
      room.addEventListener("click", () => {
        choosenRooms.innerHTML = room.textContent;
        roomsMenu.classList.add("hidden");
      });
    });
  
    // Confirmation Alert menu
    openAlertBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alertMenu.classList.toggle("hidden");
      alertMenu.classList.toggle("flex");
    });
  
    closeAlertBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alertMenu.classList.toggle("hidden");
      alertMenu.classList.toggle("flex");
    });
  
    // Fetch movie Data
    const searchInput = document.getElementById("search-movie-input");
    const movieContent = document.getElementById("movie-content");
  
    searchInput.addEventListener("input", async () => {
      const query = searchInput.value;
  
      if (query.length === 0) {
        movieContent.innerHTML = "";
        return;
      }
  
      try {
        const response = await fetch(`/api/v1/movies/search?query=${query}`);
        const movies = await response.json();
  
        if (!Array.isArray(movies)) {
          throw new TypeError("Response is not an array");
        }
  
        movieContent.innerHTML = "";
  
        movies.forEach((movie) => {
          const movieElement = document.createElement("div");
          movieElement.classList.add(
            "container",
            "space-y-7",
            "flex",
            "flex-col",
            "items-center",
            "justify-center",
            "pt-8"
          );
  
          movieElement.innerHTML = `
              <div href="" class="h-[30%] w-[50%] md:w-[35%] cursor-pointer movie-item" data-movie-id="${movie.movie_id}" data-movie-duration="${movie.duration}">
                <button>
                  <img src="/uploads/${movie.poster}" class="object-cover" alt="Movie picture">
                </button>
              </div>
              <p class="text-blueOne font-arvo text-sm md:text-lg tracking-wide font-bold text-center">${movie.title}</p>
            `;
  
          movieContent.appendChild(movieElement);
  
          movieElement.addEventListener("click", () => {
            const movieItem = movieElement.querySelector(".movie-item");
  
            // Check if the movie is already selected
            if (movieItem.classList.contains("border-4", "border-goldOne")) {
              movieItem.classList.remove("border-4", "border-goldOne");
              selectedMovieId = null;
              selectedMovieDuration = 0;
            } else {
              // Remove yellow border from previously selected movie
              document.querySelectorAll(".movie-item").forEach((item) => {
                item.classList.remove("border-4", "border-goldOne");
              });
              // Add yellow border to the clicked movie and store its ID
              movieItem.classList.add("border-4", "border-goldOne");
              selectedMovieId = movie.movie_id;
              selectedMovieDuration =
                parseInt(movieItem.dataset.movieDuration) * 60 * 1000; // Convert duration to milliseconds
              console.log(selectedMovieId, selectedMovieDuration);
            }
          });
        });
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    });
  
    // Variable for showtimes selection
    let selectedShowtimes = [];
  
  submitFormBtn.addEventListener("click", async (e) => {
      e.preventDefault();
  
      // Collect data from the form
      const movieId = selectedMovieId;
      const cinemaId = selectedCinemaId;
      const roomId = roomIdInput.value;
      const price = document.getElementById("showtimes-price").value;
      const showtimes = [];
  
      document.querySelectorAll(".datetime-picker").forEach((picker) => {
        const day = picker.querySelector(".date-input").value;
        const start_time = picker.querySelector(".time-input").value;
        const end_time = picker.querySelector(".end-time-input").value;
  
        if (day && start_time && end_time) {
          showtimes.push({
            day: day,
            start_time: start_time,
            end_time: end_time,
          });
        }
      });
  
      if (!movieId || !cinemaId || !roomId || !price || showtimes.length === 0) {
        alert("Veuillez remplir tous les champs et ajouter au moins une séance.");
        return;
      }
  
      // Prepare data for API request
      const data = {
        movie_id: movieId,
        cinema_id: cinemaId,
        room_id: roomId,
        price: price,
        showtimes: showtimes,
      };
  
      try {
        const response = await fetch("/api/v1/showtimes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          const result = await response.json();
          localStorage.setItem('success-message', 'Séance ajoutée avec succès.');
          window.location.href = "/dashboard/admin/showtimes";
        } else {
          const errorData = await response.json();
          alert(`Erreur: ${errorData.error}`);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Une erreur s'est produite lors de la soumission du formulaire.");
      }
    });
  
    const openDatetimePickerBtn = document.getElementById("open-datetime-picker");
    const datetimePickerModal = document.getElementById("datetime-picker-modal");
    const addDatetimePickerBtn = document.getElementById("add-datetime-picker");
    const datetimePickerContainer = document.getElementById(
      "datetime-picker-container"
    );
    const closeDatetimePickerBtn = document.getElementById(
      "close-datetime-picker"
    );
    const selectedShowtimesInput = document.getElementById("selected-showtimes");
  
    openDatetimePickerBtn.addEventListener("click", () => {
      datetimePickerModal.classList.remove("hidden");
    });
  
    closeDatetimePickerBtn.addEventListener("click", () => {
      datetimePickerModal.classList.add("hidden");
    });
  
    addDatetimePickerBtn.addEventListener("click", () => {
      const datetimePicker = document.createElement("div");
      datetimePicker.classList.add(
        "flex",
        "space-x-4",
        "mb-4",
        "datetime-picker"
      );
  
      datetimePicker.innerHTML = `
        <input type="date" class="outline-none border border-gray-300 rounded p-2 date-input" required>
        <label for="" class="font-arvo text-blueOne flex items-center">Début:</label>
        <input type="time" class="outline-none border border-gray-300 rounded p-2 time-input" required>
        <label for="" class="font-arvo text-blueOne flex items-center">Fin:</label>
        <input type="time" class="outline-none border border-gray-300 rounded p-2 end-time-input" required readonly>
        <span class="text-redOne error-message hidden">Chevauchement détecté!</span>
        <button type="button" class="remove-datetime-picker text-redOne">Remove</button>
      `;
  
      datetimePickerContainer.appendChild(datetimePicker);
  
      const timeInput = datetimePicker.querySelector(".time-input");
      const endTimeInput = datetimePicker.querySelector(".end-time-input");
  
      timeInput.addEventListener("input", () => {
        updateEndTime(timeInput, endTimeInput);
        validateShowtimes();
      });
  
      datetimePicker
        .querySelector(".remove-datetime-picker")
        .addEventListener("click", () => {
          datetimePicker.remove();
          validateShowtimes();
        });
    });
  
    const updateEndTime = (startTimeInput, endTimeInput) => {
      if (!selectedMovieId || selectedMovieDuration === 0) return;
  
      const startTime = new Date(`1970-01-01T${startTimeInput.value}:00`);
      const endTime = new Date(startTime.getTime() + selectedMovieDuration);
  
      const endHours = String(endTime.getHours()).padStart(2, "0");
      const endMinutes = String(endTime.getMinutes()).padStart(2, "0");
      endTimeInput.value = `${endHours}:${endMinutes}`;
    };
  
    const validateShowtimes = () => {
      const datetimePickers = document.querySelectorAll(".datetime-picker");
      const times = [];
  
      datetimePickers.forEach((picker) => {
        const dateInput = picker.querySelector(".date-input");
        const timeInput = picker.querySelector(".time-input");
        const endTimeInput = picker.querySelector(".end-time-input");
  
        const date = dateInput.value;
        const startTime = timeInput.value;
        const endTime = endTimeInput.value;
        const errorMessage = picker.querySelector(".error-message");
  
        if (date && startTime && endTime) {
          const startDateTime = new Date(`${date}T${startTime}:00`);
          const endDateTime = new Date(`${date}T${endTime}:00`);
          const overlap = times.some((t) => {
            const tStart = new Date(t.start);
            const tEnd = new Date(t.end);
            return (
              (startDateTime >= tStart && startDateTime < tEnd) ||
              (endDateTime > tStart && endDateTime <= tEnd) ||
              (startDateTime <= tStart && endDateTime >= tEnd)
            );
          });
  
          if (overlap) {
            errorMessage.classList.remove("hidden");
            addDatetimePickerBtn.disabled = true;
          } else {
            errorMessage.classList.add("hidden");
            times.push({ start: startDateTime, end: endDateTime });
          }
        }
      });
  
      if (times.length === datetimePickers.length) {
        addDatetimePickerBtn.disabled = false;
      }
    };
  
    //display succes messages variables
    const successMessage = localStorage.getItem('success-message');
    const messageContainer = document.getElementById('message');
    const text = document.getElementById('text');
  
    if (successMessage) {
      text.innerHTML = successMessage;
      messageContainer.classList.remove('hidden');
  
      setTimeout(() => {
        messageContainer.classList.add('hidden');
        localStorage.removeItem('success-message');
      }, 3000);
    }
  });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    //display succes messages variables
    const successMessage = localStorage.getItem('success-message');
    const messageContainer = document.getElementById('message');
    const text = document.getElementById('text');
  
    if (successMessage) {
      text.innerHTML = successMessage;
      messageContainer.classList.remove('hidden');
  
      setTimeout(() => {
        messageContainer.classList.add('hidden');
        localStorage.removeItem('success-message');
      }, 3000);
    }
  })
}
