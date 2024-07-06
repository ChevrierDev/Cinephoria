
const initApp = () => {

  const hamburgerBtn = document.getElementById("hamburger-button");
  const mobileMenu = document.getElementById("mobile-menu");

  const toggleHamburgerMenu = () => {
    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("flex");
    hamburgerBtn.classList.toggle("toggle-btn");
  };

  hamburgerBtn.addEventListener("click", toggleHamburgerMenu);

  window.addEventListener('resize',() => {
    if (window.innerWidth > 768) {
      if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.toggle("hidden");
        mobileMenu.classList.remove("flex");
        hamburgerBtn.classList.remove("toggle-btn");
      }
    }
  })

  
};

document.addEventListener("DOMContentLoaded", initApp);
