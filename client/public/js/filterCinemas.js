
document.addEventListener("DOMContentLoaded", function() {
  const showtimesButtons = document.querySelectorAll(".showtimes-button");
  
  showtimesButtons.forEach(button => {
    button.addEventListener("click", function() {
      const movieId = this.getAttribute("data-movie-id");
      const showtimesContainer = document.getElementById(`showtimes-${movieId}`);
      showtimesContainer.classList.toggle("hidden");
    });
  });

  const urlParams = new URLSearchParams(window.location.search);
  const cinemaId = urlParams.get("cinemaId");

  if (currentPage === "/reservation") {
    if (cinemaId) {
      window.history.replaceState({}, document.title, "/reservation");
    }
  } else {
    if (cinemaId) {
      window.history.replaceState({}, document.title, "/films");
    }
  }

});
