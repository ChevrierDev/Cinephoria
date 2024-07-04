document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper('.choose-days-slider', {
    slidesPerView: 6,
    spaceBetween: -80,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      slideChangeTransitionEnd: function () {
        const slides = document.querySelectorAll(".swiper-slide");
        slides.forEach((slide) => {
          slide.style.transition = "none";
          if (slide.classList.contains("swiper-slide-duplicate")) {
            slide.style.transform = "translateX(0px)";
          }
        });
      },
    },
    breakpoints: {
      180: { slidesPerView: 1, spaceBetween: 10 },
      480: { slidesPerView: 1, spaceBetween: 10 },
      680: { slidesPerView: 2, spaceBetween: 10 },
      786: { slidesPerView: 3, spaceBetween: 10 },
      1024: { slidesPerView: 5, spaceBetween: 10 },
      1280: { slidesPerView: 5, spaceBetween: 10 },
      1536: { slidesPerView: 5, spaceBetween: 10 },
    },
  });

  const dayButtons = document.querySelectorAll(".day-button");
  const availabilityContainer = document.querySelector("#session-availability");

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
        console.log("Sessions received:", sessions);

        if (sessions.error) {
          throw new Error(sessions.error);
        }

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

            // Utilisez simplement les heures de début et de fin
            const startTime = new Date(`1970-01-01T${showtime.start_time}Z`);
            const endTime = new Date(`1970-01-01T${showtime.end_time}Z`);

            console.log("Showtime data:", showtime);

            sessionDiv.innerHTML = `
              <div class="flex flex-col space-y-3 items-center justify-center w-[60%]">
                <h3 class="font-arvo font-bold text-lg text-blueOne">${startTime.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</h3>
                <p class="w-full text-center px-2 text-slate-300 font-bold font-arvo text-lg">${showtime.quality}</p>
              </div>
              <div class="flex items-center space-y-3 justify-center flex-col">
                <p class="font-arvo text-nowrap font-light text-sm tracking-wide text-blueOne">(fin ${endTime.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })})</p>
                <div class="flex flex-col w-14 h-9 bg-goldOne items-center justify-center text-xs font-arvo font-bold text-blueOne py-4 ">
                  <p>Salle</p>
                  <p>${showtime.room_name}</p>
                </div>
              </div>

              
            `;

            availabilityContainer.appendChild(sessionDiv);

            sessionDiv.addEventListener("click", (e) => {
              e.preventDefault();
              if (sessionDiv.classList.contains("selected-day")) {
                sessionDiv.classList.remove("selected-day");
              } else {
                document.querySelectorAll(".container.selected-day").forEach((selectedDiv) => {
                  selectedDiv.classList.remove("selected-day");
                });
                sessionDiv.classList.add("selected-day");
              }
            });
          });
        });

        // Réinitialiser et redémarrer le Swiper après mise à jour du contenu
        swiper.update();
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
        availabilityContainer.innerHTML = "<p class='text-red-500 font-bold'>Aucune séance trouvée pour cette date.</p>";
      });
  }
});
