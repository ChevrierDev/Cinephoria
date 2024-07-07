document.addEventListener('DOMContentLoaded', () => {
    const reservationsData = document.getElementById('reservationsChart').getAttribute('data-reservations');
    const reservations = JSON.parse(reservationsData);

    const ctx = document.getElementById('reservationsChart').getContext('2d');

    const data = {
        labels: reservations.map(reservation => reservation.title),
        datasets: [{
            label: 'Réservations sur la semaine',
            data: reservations.map(reservation => reservation.count),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    new Chart(ctx, config);
});