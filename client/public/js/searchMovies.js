document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("search-input");
    const searchForm = document.getElementById("search-form");
    const searchResults = document.getElementById("search-results");

    searchInput.addEventListener("input", async function() {
        const query = searchInput.value.trim();
        if (query.length > 0) {  
            try {
                const response = await fetch(`/api/v1/movies/search?query=${query}`);
                const movies = await response.json();
                displayResults(movies);
            } catch (err) {
                console.error('Error during search:', err);
            }
        } else {
            searchResults.innerHTML = '';  // Clear results if query is too short
        }
    });

    function displayResults(movies) {
        searchResults.innerHTML = '';
        if (movies.length > 0) {
            movies.forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.classList.add('movie-item');
                movieElement.innerHTML = `
                    <div class="flex space-y-2 items-center justify-center flex-col w-60 pb-3">
                       <a href="/films/disponibiliter">
                        <div class="w-full h-fit relative group">
                            <div class="relative">
                                <img src="uploads/${movie.poster}" alt="photo film" class="object-cover" />
                                <div class="absolute inset-0 flex flex-col items-center justify-center bg-blueOne/85 p-2 px-8 space-y-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <p class="font-arvo text-white text-sm text-center text-ellipsis">
                                        ${movie.description}
                                    </p>
                                    <p class="font-arvo text-goldOne font-bold text-sm text-center">5/5</p>
                                </div>
                            </div>
                        </div>
                        <h1 class="font-arvo text-blueOne text-lg font-bold tracking-wide">
                            ${movie.title}
                        </h1>
                        <p class="font-arvo text-blueOne font-thin text-sm tracking-wide">
                            Depuis le ${new Date(movie.release_date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        </a> 
                    </div>
                `;
                searchResults.appendChild(movieElement);
            });
        } else {
            searchResults.innerHTML = '<p class="font-arvo text-blueOne font-bold text-3xl">Aucun film trouvé</p>';
        }
    }
});
