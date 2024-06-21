const currentPage = window.location.pathname;

if (currentPage === "/dashboard/admin/showtimes/select-movies") {
  document.addEventListener("DOMContentLoaded", () => {
    //emloyee confirmation alert pop up variable
    // const validateBtn = document.getElementById("open-alert-btn");
    // const confirmationMenu = document.getElementById("alert");
    // const closeConfirmationMenuBtn = document.getElementById("close-alert");

    //theater variable
    const selectTheaterBtn = document.getElementById("select-theater");
    const selectTheaterMenu = document.getElementById("theater-menu");
    const theaterList = document.querySelectorAll("#theater-list li");
    const choosenTheater = document.getElementById("cinema-choosen");

    //employee variable
    const selectEmployeesBtn = document.getElementById("select-employee");
    const selectEmployeesMenu = document.getElementById("employee-menu");
    const selectEmployeesList = document.querySelectorAll("#employee-list li");
    const choosenEmployees = document.getElementById("employee-choosen");

    //close menu if another open function
    const closeMenu = () => {
      selectEmployeesMenu.classList.add("hidden");
      selectTheaterMenu.classList.add("hidden");
    };

    //theater drop down script
    selectTheaterBtn.addEventListener("click", () => {
      const isHidden = selectTheaterMenu.classList.contains("hidden");
      closeMenu();
      if (isHidden) {
        selectTheaterMenu.classList.toggle("hidden");
      }
    });

    theaterList.forEach((item) => {
      item.addEventListener("click", () => {
        choosenTheater.textContent = item.textContent;
        selectTheaterMenu.classList.add("hidden");
      });
    });

    //employee drop down script
    selectEmployeesBtn.addEventListener("click", () => {
      const isHidden = selectEmployeesMenu.classList.contains("hidden");
      closeMenu();
      if (isHidden) {
        selectEmployeesMenu.classList.toggle("hidden");
      }
    });

    selectEmployeesList.forEach((item) => {
      item.addEventListener("click", () => {
        choosenEmployees.textContent = item.textContent;
        selectEmployeesMenu.classList.add("hidden");
      });
    });

    //emloyee confirmation alert pop up dropdown
    // validateBtn.addEventListener("click", (e) => {
    //   e.preventDefault();
    //   confirmationMenu.classList.toggle("hidden");
    // });

    // closeConfirmationMenuBtn.addEventListener("click", (e) => {
    //   e.preventDefault();
    //   confirmationMenu.classList.add("hidden");
    // });
  });
} else {
  document.addEventListener("DOMContentLoaded", () => {
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
      closeAllMenus();
      scrollTo({
        top: 290,
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
  });
}
