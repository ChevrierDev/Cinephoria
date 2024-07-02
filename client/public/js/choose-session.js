document.addEventListener("DOMContentLoaded", () => {
    const dayButtons = document.querySelectorAll(".day-button");
    const cinemaId = document.getElementById('cinema-id').value;
    const filmId = document.getElementById('film-id').value;
    dayButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        dayButtons.forEach((btn) => btn.classList.remove("selected-day"));
        event.currentTarget.classList.add("selected-day");
        updateSessionAvailability(event.currentTarget.dataset.date);
      });
    });
  
    function updateSessionAvailability(date) {
      const urlParams = new URLSearchParams(window.location.search);
      const cinemaId = urlParams.get('cinemaId');
      const filmId = urlParams.get('filmId');
  
      fetch(`/reservation/get-sessions?date=${date}&cinemaId=${cinemaId}&filmId=${filmId}`)
        .then((response) => response.json())
        .then((sessions) => {
          const availabilityContainer = document.querySelector("#session-availability");
          availabilityContainer.innerHTML = "";
  
          sessions.forEach((session) => {
            session.showtimes.forEach((showtime) => {
              const sessionDiv = document.createElement("div");
              sessionDiv.classList.add(
                "container",
                "flex",
                "items-center",
                "w-[15vw]",
                "bg-whiteOne",
                "shadow-xl",
                "h-[20vh]"
              );
  
              sessionDiv.innerHTML = `
                <div class="flex flex-col space-y-3 items-center justify-center w-[60%]">
                  <h3 class="font-arvo font-bold text-lg text-blueOne">${new Date('1970-01-01T' + showtime.start_time).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</h3>
                  <p class="w-full text-center px-2 text-slate-300 font-bold font-arvo text-lg">${showtime.quality}</p>
                </div>
                <div class="flex items-center space-y-3 justify-center flex-col">
                  <p class="font-arvo text-nowrap font-light text-sm tracking-wide text-blueOne">(fin ${new Date('1970-01-01T' + showtime.end_time).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })})</p>
                  <div class="flex flex-col w-14 h-9 bg-goldOne items-center justify-center text-xs font-arvo font-bold text-blueOne py-4 ">
                    <p>Salle</p>
                    <p>${showtime.room_name}</p>
                  </div>
                </div>
              `;
  
              availabilityContainer.appendChild(sessionDiv);
            });
          });
        })
        .catch((error) => {
          console.error("Error fetching sessions:", error);
        });
    }
  });
  