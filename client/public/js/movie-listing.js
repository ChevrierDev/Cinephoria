document.addEventListener("DOMContentLoaded", () => {
    const movieCards = document.querySelectorAll(".movie-card");
  
    movieCards.forEach((card) => {
      card.addEventListener("click", () => {
        card.classList.toggle("outline");
        card.classList.toggle("outline-goldOne");
        card.classList.toggle("outline-8");
      });
    });



    console.log(window.screen.height)
  });
  