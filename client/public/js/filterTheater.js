const currentPage = window.location.pathname
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("search-theater-input");
    const franceCinemaList = document.getElementById("france-cinema-list");
    const belgiumCinemaList = document.getElementById("belgium-cinema-list");

    function normalizeText(text) {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    searchInput.addEventListener("input", function() {
        const filter = normalizeText(searchInput.value);

        franceCinemaList.classList.add("hidden");
        belgiumCinemaList.classList.add("hidden");

        if (filter === "") {
            franceCinemaList.classList.add("hidden");
            belgiumCinemaList.classList.add("hidden");
            return;
        }

        const franceItems = franceCinemaList.querySelectorAll(".cinema-item");
        const belgiumItems = belgiumCinemaList.querySelectorAll(".cinema-item");

        let franceMatch = false;
        let belgiumMatch = false;

        franceItems.forEach(item => {
            const itemText = normalizeText(item.textContent);
            if (itemText.includes(filter)) {
                item.classList.remove("hidden");
                franceMatch = true;
            } else {
                item.classList.add("hidden");
            }
        });

        belgiumItems.forEach(item => {
            const itemText = normalizeText(item.textContent);
            if (itemText.includes(filter)) {
                item.classList.remove("hidden");
                belgiumMatch = true;
            } else {
                item.classList.add("hidden");
            }
        });

        if (franceMatch) {
            franceCinemaList.classList.remove("hidden");
        }
        if (belgiumMatch) {
            belgiumCinemaList.classList.remove("hidden");
        }
    });

    const cinemaItems = document.querySelectorAll(".cinema-item");

    cinemaItems.forEach(item => {
      item.addEventListener("click", function() {
        const cinemaId = this.getAttribute("data-cinema-id");
        if (currentPage === "/reservation") {
            window.location.href = `/reservation?cinemaId=${cinemaId}`;
        }else{
            window.location.href = `/films?cinemaId=${cinemaId}`;
        }
        
      });
    });
});
