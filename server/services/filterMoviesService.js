// services/filterMoviesService.js
function filterShowtimes(showtimes, genres, days, qualities) {
    return showtimes.filter(showtime => {
      const showtimeGenres = (showtime.genre || '').toLowerCase().split(" ");
      const showtimeDays = showtime.showtimes ? showtime.showtimes.map(st => new Date(st.day).toLocaleDateString('fr-FR', { weekday: 'long' }).toLowerCase()) : [];
      const showtimeQualities = showtime.showtimes ? showtime.showtimes.map(st => (st.quality || '').toLowerCase()) : [];
  
      console.log('Showtime Days:', showtimeDays);
  
      const genresArray = Array.isArray(genres) ? genres : genres ? genres.split(",") : [];
      const daysArray = Array.isArray(days) ? days : days ? days.split(",") : [];
      const qualitiesArray = Array.isArray(qualities) ? qualities : qualities ? qualities.split(",") : [];
  
      console.log('Days Array:', daysArray);
  
      const genreMatch = !genresArray.length || genresArray.some(genre => showtimeGenres.includes(genre.toLowerCase()));
      const dayMatch = !daysArray.length || daysArray.some(day => showtimeDays.includes(day.toLowerCase()));
      const qualityMatch = !qualitiesArray.length || qualitiesArray.some(quality => showtimeQualities.includes(quality.toLowerCase()));
  
      return genreMatch && dayMatch && qualityMatch;
    });
  }
  
  function filterMovies(movies, genres, days, qualities) {
    return movies.filter(movie => {
      const movieGenres = (movie.genre || '').toLowerCase().split(" ");
      const movieReleaseDate = new Date(movie.release_date);
      const movieDay = movieReleaseDate.toLocaleDateString('fr-FR', { weekday: 'long' }).toLowerCase();
      const movieQuality = (movie.quality || '').toLowerCase();
  
      const genresArray = Array.isArray(genres) ? genres : genres ? genres.split(",") : [];
      const daysArray = Array.isArray(days) ? days : days ? days.split(",") : [];
      const qualitiesArray = Array.isArray(qualities) ? qualities : qualities ? qualities.split(",") : [];
  
      const genreMatch = !genresArray.length || genresArray.some(genre => movieGenres.includes(genre.toLowerCase()));
      const dayMatch = !daysArray.length || daysArray.some(day => day.toLowerCase() === movieDay);
      const qualityMatch = !qualitiesArray.length || qualitiesArray.includes(movieQuality);
  
      return genreMatch && dayMatch && qualityMatch;
    });
  }
  
  module.exports = {
    filterShowtimes,
    filterMovies
  };
  