const chooseSeatInitApp = () => {
    const playTrailerBtn = document.getElementById('start-trailer');
    const closeTrailerBtn = document.getElementById('close-video');
    const movieContainer = document.getElementById('movie');
    const reserveMovieBtn = document.querySelectorAll('.reservation-confirmation');
    const movieReservationMenu = document.getElementById('reservation-details');
    const body = document.body;

    const toggleVideoTrailer = (event) => {
        event.stopPropagation();  
        movieContainer.classList.toggle('hidden');
        body.classList.toggle('blur-body');
        body.classList.toggle('darken-background');
    }

    const closeVideoTrailer = (event) => {
        event.stopPropagation();  
        movieContainer.classList.add('hidden');
        body.classList.remove('blur-body');
        body.classList.remove('darken-background');
    }

    const toggleMovieReservationMenue = (event) => {
        event.stopPropagation();  
        movieReservationMenu.classList.toggle('hidden');
        body.classList.toggle('darken-background');
    }

    const closeMovieReservationMenu = (event) => {
        if (!movieReservationMenu.contains(event.target) && !event.target.classList.contains('reservation-confirmation')) {
            movieReservationMenu.classList.add('hidden');
            body.classList.remove('darken-background');
        }
    }

    playTrailerBtn.addEventListener('click', toggleVideoTrailer);
    closeTrailerBtn.addEventListener('click', closeVideoTrailer);
    reserveMovieBtn.forEach(btn => {
        btn.addEventListener('click', toggleMovieReservationMenue);
    });
    body.addEventListener('click', closeMovieReservationMenu);
}

document.addEventListener('DOMContentLoaded', chooseSeatInitApp);
