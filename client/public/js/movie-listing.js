document.addEventListener("DOMContentLoaded", () => {
  const movieCards = document.querySelectorAll(".movie-card");
  const descriptionBtn = document.getElementById("movie-description");
  const closeDescriptionBtn = document.getElementById("close-description");

  const descriptionCard = document.getElementById("description-card");

  //movie card selection effect
  movieCards.forEach((card) => {
    card.addEventListener("click", () => {
      let isSelected = card.classList.contains("outline-goldOne");

      movieCards.forEach((m) => {
        m.classList.remove("outline");
        m.classList.remove("outline-goldOne");
        m.classList.remove("outline-8");
      });

      if (!isSelected) {
        card.classList.add("outline");
        card.classList.add("outline-goldOne");
        card.classList.add("outline-8");
      }

      let anySelected = false;
      movieCards.forEach((m) => {
        if (m.classList.contains("outline-goldOne")) {
          anySelected = true;
        }
      });

      if (anySelected) {
        descriptionBtn.classList.remove("hidden");
        descriptionBtn.classList.add("flex");
      } else {
        descriptionBtn.classList.remove("flex");
        descriptionBtn.classList.add("hidden");
      }
    });
  });

  descriptionBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 210,
      behavior: "smooth",
    });
    descriptionCard.classList.toggle("hidden");
    descriptionCard.classList.toggle("flex");
  });

  closeDescriptionBtn.addEventListener("click", () => {
    descriptionCard.classList.add("hidden");
    descriptionCard.classList.remove("flex");
  });

  console.log(window.screen.height);
});
