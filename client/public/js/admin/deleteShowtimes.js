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

  openAlertBtn.addEventListener("click", (e) => {
    e.preventDefault();
    scrollTo({
      top: 50,
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
