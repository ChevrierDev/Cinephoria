const initApp = () => {

  const hamburgerBtn = document.getElementById("hamburger-button");
  const mobileMenu = document.getElementById("mobile-menu");

  const quickaccess1Btn = document.getElementById("quickaccess-1");
  const quickaccess2Btn = document.getElementById("quickaccess-2");

  const franceCinemaMenu = document.getElementById("france-cinema-list");
  const belgiumCinemaMenu = document.getElementById("belgium-cinema-list");

  
  const openTheaterMenueBtn = document.querySelectorAll('.theater-filter');
  const theaterMenu = document.getElementById("theater-menu");
  const closeTheaterMenuBtn = document.getElementById("close-search-theater-menu");

  const toggleHamburgerMenu = () => {
    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("flex");
    hamburgerBtn.classList.toggle("toggle-btn");
  };

  const toggleFranceCinemaMenu = () => {
    franceCinemaMenu.classList.toggle("hidden");
    franceCinemaMenu.classList.toggle("flex");
  };

  const toggleBelgiumCinemaMenu = () => {
    belgiumCinemaMenu.classList.toggle("hidden");
    belgiumCinemaMenu.classList.toggle("flex");
  };

  const closeTheaterMenu = () => {
    theaterMenu.classList.toggle("hidden");
    theaterMenu.classList.toggle("flex");
  }

  const openTheaterMenue = () => {
    theaterMenu.classList.toggle("hidden");
    theaterMenu.classList.toggle("flex");
  }

  hamburgerBtn.addEventListener("click", toggleHamburgerMenu);
  quickaccess1Btn.addEventListener("click", toggleFranceCinemaMenu);
  quickaccess2Btn.addEventListener("click", toggleBelgiumCinemaMenu);
  closeTheaterMenuBtn.addEventListener("click", closeTheaterMenu);
  
  openTheaterMenueBtn.forEach(btn => {
    btn.addEventListener('click', openTheaterMenue)
  })

};

document.addEventListener("DOMContentLoaded", initApp);
