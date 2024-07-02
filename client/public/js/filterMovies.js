document.addEventListener("DOMContentLoaded", function() {
    const applyFilterButton = document.getElementById("apply-filter");
    const resetFilterButton = document.getElementById("reset-filter");
    const noMoviesMessage = document.getElementById("no-movies-message");
    const filterMenu = document.getElementById("filter-menu");
    const filterForm = document.getElementById("filter-form");
    const cinemaIdInput = document.getElementById("cinemaId");

    applyFilterButton.addEventListener("click", function(event) {
        event.preventDefault(); 
        filterMenu.classList.add("hidden");
        filterForm.submit();
    });

    resetFilterButton.addEventListener("click", function() {
        document.querySelectorAll("#genre-filter input, #day-filter input, #quality-filter input").forEach(checkbox => checkbox.checked = false);
        document.querySelectorAll(".movie").forEach(movie => movie.classList.remove("hidden"));
        noMoviesMessage.classList.add("hidden");
    });
});
