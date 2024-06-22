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

    selectTheaterBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openTheaterMenu.classList.toggle("hidden");
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
}
