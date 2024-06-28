document.addEventListener("DOMContentLoaded", () => {
  const openDeleteAlertBtn = document.getElementById("open-delete-menu");
  const closeDeleteAlertBtn = document.getElementById("close-delete-menu");
  const deleteAlert = document.getElementById("delete-alert");
  const deleteMessage = document.getElementById("delete-message");
  const confirmDeleteButton = document.getElementById("confirm-delete");

  let selectedMovieId = null;
  let selectedMovieTitle = null;

  closeDeleteAlertBtn.addEventListener("click", () => {
    deleteAlert.classList.toggle("hidden");
    deleteAlert.classList.toggle("flex");
  });

  openDeleteAlertBtn.addEventListener("click", () => {
    if (selectedMovieId && selectedMovieTitle) {
      deleteMessage.innerText = `VOULEZ-VOUS VRAIMENT SUPPRIMER LE FILM "${selectedMovieTitle}" ?`;
      deleteAlert.classList.toggle("hidden");
      deleteAlert.classList.toggle("flex");
    } else {
      alert("Veuillez sélectionner un film à supprimer.");
    }
  });

  const searchInput = document.getElementById("search-movie-input");
  const movieContent = document.getElementById("movie-content");

  function toggleHighlight(movieElement) {
    const buttonElement = movieElement.querySelector("button");

    if (buttonElement.classList.contains("border-8", "border-yellow-500")) {
      buttonElement.classList.remove("border-8", "border-yellow-500");
      return false;
    } else {
      const previouslySelected = document.querySelector(".selected-border");
      if (previouslySelected) {
        previouslySelected.classList.remove(
          "selected-border",
          "border-8",
          "border-yellow-500"
        );
      }

      buttonElement.classList.add(
        "selected-border",
        "border-8",
        "border-yellow-500"
      );
      return true;
    }
  }

  searchInput.addEventListener("input", async () => {
    const query = searchInput.value;

    if (query.length === 0) {
      movieContent.innerHTML = "";
      return;
    }

    try {
      const response = await fetch(`/api/v1/movies/search?query=${query}`);
      const movies = await response.json();

      if (!Array.isArray(movies)) {
        throw new TypeError("Response is not an array");
      }

      movieContent.innerHTML = "";

      movies.forEach((movie) => {
        const movieElement = document.createElement("div");
        movieElement.classList.add(
          "container",
          "space-y-7",
          "flex",
          "flex-col",
          "items-center",
          "justify-center",
          "pt-8",
          "selected-movies"
        );

        movieElement.dataset.movieId = movie.movie_id;
        movieElement.dataset.movieTitle = movie.title;

        movieElement.innerHTML = `
        <div class="h-[30%] w-[50%] md:w-[35%]">
          <button>
            <img src="/uploads/${movie.poster}" class="object-cover" alt="Movie picture">
          </button>
        </div>
        <p class="text-blueOne font-arvo text-sm md:text-lg tracking-wide font-bold text-center">${movie.title}</p>
      `;

        movieContent.appendChild(movieElement);
      });

      const movieSelected = document.querySelectorAll(".selected-movies");
      movieSelected.forEach((movie) => {
        movie.addEventListener("click", (e) => {
          e.preventDefault();
          const movieId = movie.dataset.movieId;
          const movieTitle = movie.dataset.movieTitle;
          const isSelected = toggleHighlight(movie);

          if (isSelected) {
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set("movieId", movieId);
            const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
            history.pushState(null, "", newUrl);

            selectedMovieId = movieId;
            selectedMovieTitle = movieTitle;
          } else {
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.delete("movieId");
            const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
            history.pushState(null, "", newUrl);
            selectedMovieId = null;
            selectedMovieTitle = null;
          }
        });
      });
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  });

  window.addEventListener("load", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedMovieId = urlParams.get("movieId");
    if (selectedMovieId) {
      const selectedMovie = document.querySelector(
        `.selected-movies[data-movie-id="${selectedMovieId}"]`
      );
      if (selectedMovie) {
        toggleHighlight(selectedMovie);
      }
    }
    history.replaceState(null, "", window.location.pathname);
  });

  // Gestionnaire d'événements pour le bouton de confirmation de suppression
  confirmDeleteButton.addEventListener('click', async () => {
    if (selectedMovieId) {
      try {
        const response = await fetch(`/api/v1/movies/${selectedMovieId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          localStorage.setItem('delete-message', 'Le film a été supprimé avec succès.');
          location.reload();
        } else {
          alert('Erreur lors de la suppression du film.');
        }
      } catch (error) {
        console.error('Error deleting movie:', error);
        alert('Erreur lors de la suppression du film.');
      }
    }
  });

  const confirmationDeleteMessage = localStorage.getItem("delete-message");
    
  if (confirmationDeleteMessage) {
    const messageElement = document.getElementById("confirmation-message");
    const textElement = document.getElementById("confirmation-text");
    
    textElement.innerText = confirmationDeleteMessage;

    messageElement.classList.remove("hidden");
    messageElement.classList.add("flex");

    setTimeout(() => {
      messageElement.classList.add("hidden");
      messageElement.classList.remove("flex");
      localStorage.removeItem("delete-message");
    }, 1500);
  }
});
