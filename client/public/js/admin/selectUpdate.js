document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-movie-input");
    const movieContent = document.getElementById("movie-content");
  
    searchInput.addEventListener("input", async () => {
      const query = searchInput.value;
  
      if (query.length === 0) {
        movieContent.innerHTML = "";
        return;
      }
  
      try {
        const response = await fetch(`/api/v1/movies/search?query=${query}`);
        const movies = await response.json();
        console.log(movies)
  
        if (!Array.isArray(movies)) {
          throw new TypeError('Response is not an array');
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
            "pt-8"
          );
  
          movieElement.innerHTML = `
              <a href="/dashboard/admin/films/update?id=${movie.movie_id}" class="h-[30%] w-[50%] md:w-[35%]">
                <button>
                  <img src="/uploads/${movie.poster}" class="object-cover" alt="Movie picture">
                </button>
              </a>
              <p class="text-blueOne font-arvo text-sm md:text-lg tracking-wide font-bold text-center">${movie.title}</p>
            `;
  
          movieContent.appendChild(movieElement);
        });
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    });
  });
  