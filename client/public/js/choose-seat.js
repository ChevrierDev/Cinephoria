const chooseSeatInitApp = () => {
    const playTrailerBtn = document.getElementById('start-trailer');
    const closeTrailerBtn = document.getElementById('close-video');
    const movieContainer = document.getElementById('movie');
    const body = document.body;

    const toggleVideoTrailer = () => {
        movieContainer.classList.toggle('hidden');
        body.classList.toggle('blur-body');
        body.classList.toggle('darken-background');
    }

    const closeVideoTrailer = () => {
        movieContainer.classList.add('hidden');
        body.classList.remove('blur-body');
        body.classList.remove('darken-background');
    }

    playTrailerBtn.addEventListener('click', toggleVideoTrailer);
    closeTrailerBtn.addEventListener('click', closeVideoTrailer);
}

document.addEventListener('DOMContentLoaded', chooseSeatInitApp);
