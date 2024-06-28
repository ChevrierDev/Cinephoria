const currentPage = window.location.pathname;

if (currentPage === "/dashboard/employee/films/update") {
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
        console.log(movies);

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
            "pt-8"
          );

          movieElement.innerHTML = `
              <a href="/dashboard/employee/films/update/${movie.movie_id}" class="h-[30%] w-[50%] md:w-[35%]">
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
} else {
  document.addEventListener("DOMContentLoaded", async function () {
    const confirmationBtn = document.getElementById("confirmation-button");
    const alert = document.getElementById("alert");
    const closeAlert = document.getElementById("close-alert");

    const submit = document.getElementById("submit-form");

    confirmationBtn.addEventListener("click", (e) => {
      e.preventDefault();
      scrollTo({
        top: 450,
        behavior: "smooth",
      });
      alert.classList.toggle("hidden");
      alert.classList.toggle("flex");
    });

    closeAlert.addEventListener("click", (e) => {
      e.preventDefault();
      alert.classList.add("hidden");
      alert.classList.remove("flex");
    });

    document.querySelectorAll(".file-input").forEach((input) => {
      input.addEventListener("change", function () {
        const fileName = this.files[0].name;
        const label = this.previousElementSibling;
        label.innerText = fileName;
      });
    });

    submit.addEventListener("click", function (e) {
      document.querySelectorAll('input[type="text"]').forEach((input) => {
        if (input.value.trim() === "" && input.name !== "favorite") {
          input.value = input.placeholder;
        }
      });

      const favoriteInput = document.getElementById("favorite-input");
      if (favoriteInput.value.trim() === "") {
        favoriteInput.value = "false";
      }
    });

    document
      .getElementById("update-movie-form")
      .addEventListener("submit", async function (event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const actionUrl = form.action;

        try {
          const response = await fetch(actionUrl, {
            method: "POST",
            body: formData,
          });

          const result = await response.json();

          if (result.success) {
            localStorage.setItem(
              "update-succes",
              "Le film a été modifié avec succès."
            );
            window.location.href = "/dashboard/employee/films";
          } else {
            alert(result.message || "Une erreur est survenue.");
          }
        } catch (error) {
          alert("Une erreur est survenue.", error);
        }
      });
  });
}
