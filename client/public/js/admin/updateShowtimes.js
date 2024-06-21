const currentPage = window.location.pathname;

document.addEventListener("DOMContentLoaded", () => {
  //theater variable
  const selectTheaterBtn = document.getElementById("select-theater");
  const selectTheaterMenu = document.getElementById("theater-menu");
  const theaterList = document.querySelectorAll("#theater-list li");
  const choosenTheater = document.getElementById("cinema-choosen");

  //movies variable
  const selectMovieBtn = document.getElementById("select-films");
  const selectMovieMenu = document.getElementById("films-menu");
  const movieList = document.querySelectorAll("#films-list li");
  const choosenMovie = document.getElementById("films-choosen");

  //rooms variable
  const selectRoomsBtn = document.getElementById("select-rooms");
  const openRoomsMenu = document.getElementById("room-menu");
  const roomChoosen = document.getElementById("room-choosen");
  const roomListItem = document.querySelectorAll("#room-list li");

  //qualities variable
  const selectQualitiesBtn = document.getElementById("select-quality");
  const qualitiesMenu = document.getElementById("quality-menu");
  const qualitieChoosen = document.getElementById("quality-choosen");
  const qualitieListItem = document.querySelectorAll("#quality-list li");

  const openAlertBtn = document.getElementById("open-alert-btn");
  const alertMenu = document.getElementById("alert");
  const closeAlertBtn = document.getElementById("close-alert");

  //close menu if another open function
  const closeMenu = () => {
    selectMovieMenu.classList.add("hidden");
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

  //movies drop down script
  selectMovieBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const isHidden = selectMovieMenu.classList.contains("hidden");
    closeMenu();
    if (isHidden) {
      selectMovieMenu.classList.toggle("hidden");
    }
  });

  movieList.forEach((item) => {
    item.addEventListener("click", () => {
      choosenMovie.textContent = item.textContent;
      selectMovieMenu.classList.add("hidden");
    });
  });

  selectRoomsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const isHidden = openRoomsMenu.classList.contains("hidden");
    closeMenu();
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
    closeMenu();
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

  openAlertBtn.addEventListener("click", (e) => {
    e.preventDefault();
    scrollTo({
      top: 300,
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
