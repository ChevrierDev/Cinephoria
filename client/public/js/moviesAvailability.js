document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.form-link').forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        const country = this.getAttribute('data-country');
        const filmId = this.getAttribute('data-film-id');
        fetch(`/cinemas/${country}/${filmId}`)
          .then(response => response.text())
          .then(html => {
            document.getElementById('theater-section').innerHTML = html;
            document.querySelectorAll('.form-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
          })
          .catch(err => console.error('Error loading theaters:', err));
      });
    });
  });