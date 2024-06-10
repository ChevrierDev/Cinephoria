CREATE TABLE users (
    user_id SERIAL  NOT NULL PRIMARY KEY,
    first_name VARCHAR(250) NOT NULL,
    last_name VARCHAR(250) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(150) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'user', 'employee'))
);

CREATE TABLE movies (
    movie_id SERIAL  NOT NULL PRIMARY KEY,
    title VARCHAR(250) NOT NULL,
    duration INT NOT NULL,
    genre VARCHAR(250) NOT NULL,
    pg INT,
    banner TEXT NOT NULL,
    poster TEXT NOT NULL,
    video TEXT,
    favorite BOOLEAN DEFAULT false,
    description VARCHAR(500) NOT NULL,
    casting VARCHAR(500) NOT NULL,
    release_date DATE NOT NULL
);

CREATE TABLE cinemas (
    cinema_id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    location VARCHAR(250) NOT NULL,
    country VARCHAR(250) NOT NULL,
    images TEXT NOT NULL
);

CREATE TABLE rooms (
    room_id SERIAL  NOT NULL PRIMARY KEY,
    cinema_id INT NOT NULL,
    name VARCHAR(250) NOT NULL,
    quality VARCHAR(250),
    FOREIGN KEY (cinema_id) REFERENCES cinemas(cinema_id)
);

CREATE TABLE seats (
    seat_id SERIAL  NOT NULL PRIMARY KEY,
    room_id INT NOT NULL,
    seat_label VARCHAR(10) NOT NULL,
    accessibility BOOLEAN DEFAULT false,
    FOREIGN KEY (room_id) REFERENCES rooms(room_id)
);

CREATE TABLE reviews (
    review_id SERIAL NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    rating INT NOT NULL,
    comment VARCHAR(250) NOT NULL,
    status BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id)
);

CREATE TABLE showtimes (
    showtimes_id SERIAL NOT NULL PRIMARY KEY,
    movie_id INT NOT NULL,
    cinema_id INT NOT NULL,
    room_id INT NOT NULL,
    day DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    price INT NOT NULL,
    qr TEXT UNIQUE NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id),
    FOREIGN KEY (cinema_id) REFERENCES cinemas(cinema_id),
    FOREIGN KEY (room_id) REFERENCES rooms(room_id)
);

CREATE TABLE reservations (
    reservation_id SERIAL  NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    cinema_id INT NOT NULL,
    showtimes_id INT NOT NULL,
    seats_reserved VARCHAR(50) NOT NULL,
    status BOOLEAN NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (cinema_id) REFERENCES cinemas(cinema_id),
    FOREIGN KEY (showtimes_id) REFERENCES showtimes(showtimes_id)
);

CREATE TABLE incident (
    incident_id SERIAL  NOT NULL PRIMARY KEY,
    room_id INT NOT NULL,
    seat_id INT NOT NULL,
    user_id INT NOT NULL,
    description VARCHAR(250),
    report_date DATE,
    FOREIGN KEY (room_id) REFERENCES rooms(room_id),
    FOREIGN KEY (seat_id) REFERENCES seats(seat_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Adding Indexes
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_movie_id ON reviews(movie_id);
CREATE INDEX idx_showtimes_movie_id ON showtimes(movie_id);
CREATE INDEX idx_showtimes_cinema_id ON showtimes(cinema_id);
CREATE INDEX idx_showtimes_room_id ON showtimes(room_id);
CREATE INDEX idx_reservations_user_id ON reservations(user_id);
CREATE INDEX idx_reservations_cinema_id ON reservations(cinema_id);
CREATE INDEX idx_reservations_showtimes_id ON reservations(showtimes_id);
CREATE INDEX idx_rooms_cinema_id ON rooms(cinema_id);
CREATE INDEX idx_seats_room_id ON seats(room_id);
CREATE INDEX idx_incident_room_id ON incident(room_id);
CREATE INDEX idx_incident_seat_id ON incident(seat_id);
CREATE INDEX idx_incident_user_id ON incident(user_id);