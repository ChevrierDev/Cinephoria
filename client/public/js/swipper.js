const initSwipper = () => {
  // Initialiser le premier carrousel
  const mainSlider = new Swiper(".main-slider", {
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 2500,
    },
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const latestMovieSlider = new Swiper(".latest-movie-slider", {
    slidesPerView: 4,
    spaceBetween: 10,
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      180: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      680: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      1536: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
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
  });

  // const chooseDaysSlider = new Swiper(".choose-days-slider", {
  //   slidesPerView: 6,
  //   spaceBetween: -80, 
  //   grabCursor: true,
  //   pagination: {
  //     el: ".swiper-pagination",
  //     clickable: true,
  //   },
  //   navigation: {
  //     nextEl: ".swiper-button-next",
  //     prevEl: ".swiper-button-prev",
  //   },
  //   on: {
  //     slideChangeTransitionEnd: function () {
  //       const slides = document.querySelectorAll(".swiper-slide");
  //       slides.forEach((slide) => {
  //         slide.style.transition = "none";
  //         if (slide.classList.contains("swiper-slide-duplicate")) {
  //           slide.style.transform = "translateX(0px)";
  //         }
  //       });
  //     },
  //   },
  //   breakpoints: {
  //     180: {
  //       slidesPerView: 1,
  //       spaceBetween: 10,
  //     },
  //     480: {
  //       slidesPerView: 1,
  //       spaceBetween: 10,
  //     },
  //     680: {
  //       slidesPerView: 2,
  //       spaceBetween: 10,
  //     },
  //     786: {
  //       slidesPerView: 3,
  //       spaceBetween: 10,
  //     },
  //     1024: {
  //       slidesPerView: 6,
  //       spaceBetween: 10,
  //     },
  //     1280: {
  //       slidesPerView: 6,
  //       spaceBetween: 10,
  //     },
  //     1536: {
  //       slidesPerView: 6,
  //       spaceBetween: 10,
  //     },
  //   },
  // });
};

document.addEventListener("DOMContentLoaded", initSwipper);
