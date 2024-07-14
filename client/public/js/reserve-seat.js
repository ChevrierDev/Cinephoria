document.addEventListener("DOMContentLoaded", (event) => {
    const chairDiv = document.querySelector('.chair');
    const reservedSeats = JSON.parse(chairDiv.getAttribute('data-reserved-seats'));
    const totalSeatsCountElement = document.getElementById('totalSeats-count');
    const seats = document.querySelectorAll(".seat");
    const seatsCountElements = document.querySelectorAll(".seats-count");
    const totalPriceElement = document.getElementById("total-price");
    const goPaymentButton = document.getElementById("go-payment");
    const errorMessageElement = document.getElementById("error-message");
    const pricePerSeat = parseFloat(totalPriceElement.getAttribute("data-price"));
    const userId = document.getElementById("user_id").value;
    const cinemaId = document.getElementById("cinema_id").value;
    const showtimesId = document.getElementById("showtimes_id").value;
    const totalReservedSeats = document.getElementById('seats-reserved')
    let reservedCount = 0;
    let selectedSeats = [];

    seats.forEach((seat) => {
        const seatId = seat.getAttribute("data-id");
        if (reservedSeats.includes(seatId)) {
            seat.classList.add("booked");
            seat.style.pointerEvents = 'none'; 
        } else {
            seat.addEventListener("click", () => {
                if (seat.classList.contains("selected")) {
                    seat.classList.remove("selected");
                    reservedCount--;
                    selectedSeats = selectedSeats.filter((id) => id !== seatId);
                } else {
                    seat.classList.add("selected");
                    reservedCount++;
                    selectedSeats.push(seatId);
                }
                seatsCountElements.forEach(element => {
                    element.textContent = `${reservedCount} place${reservedCount > 1 ? "s" : ""} réservée`;
                });

                totalReservedSeats.innerHTML = `${reservedCount} place${reservedCount > 1 ? "s" : ""}`

                const totalPrice = reservedCount * pricePerSeat;
                totalPriceElement.textContent = `TOTAL A RÉGLER : ${totalPrice.toFixed(2)} €`;
                console.log("Selected Seats:", selectedSeats);
            });
        };
    });

    const totalSeatsCount = parseInt(chairDiv.getAttribute('data-total-seats'));
    const availableSeatsCount = totalSeatsCount - reservedSeats.length;
    totalSeatsCountElement.textContent = `${availableSeatsCount} places libres`;

    goPaymentButton.addEventListener("click", async (event) => {
        if (reservedCount === 0) {
            event.preventDefault();
            errorMessageElement.classList.remove("hidden");
            setTimeout(() => {
                errorMessageElement.classList.add("hidden");
            }, 2500);
        } else {
            if (!errorMessageElement.classList.contains("hidden")) {
                errorMessageElement.classList.add("hidden");
            }
            const reservationData = {
                user_id: userId,
                cinema_id: cinemaId,
                showtimes_id: showtimesId,
                seats_reserved: selectedSeats,
                status: false 
            };
            try {
                const response = await fetch('/api/v1/reservation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(reservationData)
                });

                const result = await response.json();
                if (response.ok) {
                    localStorage.setItem('success-message', 'La réservation a bien été confirmée.');
                    location.reload();
                } else {
                    alert('Erreur de réservation: ' + result.error);
                }
            } catch (error) {
                console.error('Erreur de réservation:', error);
                alert('Erreur de réservation: ' + error.message);
            }
        }
    });

    const successMessage = localStorage.getItem('success-message');
    const messageContainer = document.getElementById('message');
    const text = document.getElementById('text');

    if (successMessage) {
        text.innerText = successMessage;
        messageContainer.classList.remove('hidden');

        setTimeout(() => {
            messageContainer.classList.add('hidden');
            localStorage.removeItem('success-message');
        }, 3000);
    }
});
