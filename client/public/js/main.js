const initApp = () => {
  const hamburgerBtn = document.getElementById('hamburger-button');
  const mobileMenu = document.getElementById('mobile-menu');

  const toggleMenu = () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
    hamburgerBtn.classList.toggle('toggle-btn');
  }

  hamburgerBtn.addEventListener('click', toggleMenu);
  mobileMenu.addEventListener('click', toggleMenu);

  // Initialiser le premier carrousel
  const mainSlider = new Swiper('.main-slider', {
    loop: true,
    autoplay: {
      delay: 2500,
    },
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // Initialiser le second carrousel
  const latestMovieSlider = new Swiper('.latest-movie-slider', {
    loop: true,
    slidesPerView: 3,
    autoplay: {
      delay: 2500,
    },
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    spaceBetween: -300, 
  });
}

document.addEventListener('DOMContentLoaded', initApp);
