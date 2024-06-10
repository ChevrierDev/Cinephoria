-- Inserting data into users table
INSERT INTO users (user_id, first_name, last_name, email, password, role) VALUES
(1, 'John', 'Doe', 'john.doe@example.com', 'password123', 'admin'),
(2, 'Jane', 'Smith', 'jane.smith@example.com', 'password123', 'user'),
(3, 'Alice', 'Johnson', 'alice.johnson@example.com', 'password123', 'employee');

-- Inserting data into movies table
INSERT INTO movies (movie_id, title, duration, genre, pg, banner, poster, video, favorite, description, casting, release_date) VALUES
(1, 'Inception', 148, 'Sci-Fi', 13, 'inception_banner.jpg', 'inception_poster.jpg', 'inception_trailer.mp4', false, 'A mind-bending thriller.', 'Leonardo DiCaprio, Joseph Gordon-Levitt', '2010-07-16'),
(2, 'The Dark Knight', 152, 'Action', 13, 'dark_knight_banner.jpg', 'dark_knight_poster.jpg', 'dark_knight_trailer.mp4', false, 'A gripping action film.', 'Christian Bale, Heath Ledger', '2008-07-18');

-- Inserting data into cinemas table
INSERT INTO cinemas (cinema_id, name, location, country, images) VALUES
(1, 'Cinema City', 'Downtown', 'USA', 'cinema_city.jpg'),
(2, 'Movie Palace', 'Uptown', 'USA', 'movie_palace.jpg');

-- Inserting data into rooms table
INSERT INTO rooms (room_id, cinema_id, name, quality) VALUES
(1, 1, 'Room 1', 'Standard'),
(2, 1, 'Room 2', 'IMAX'),
(3, 2, 'Room 1', 'Standard');

-- Inserting data into seats table
INSERT INTO seats (seat_id, room_id, seat_label, accessibility) VALUES
(1, 1, 'A1', false),
(2, 1, 'A2', false),
(3, 2, 'B1', true),
(4, 2, 'B2', false);

-- Inserting data into reviews table
INSERT INTO reviews (review_id, user_id, movie_id, rating, comment, status, created_at) VALUES
(1, 1, 1, 5, 'Amazing movie!', true, CURRENT_TIMESTAMP),
(2, 2, 2, 4, 'Great action scenes.', false, CURRENT_TIMESTAMP);

-- Inserting data into showtimes table
INSERT INTO showtimes (showtimes_id, movie_id, cinema_id, room_id, day, start_time, end_time, price, qr) VALUES
(1, 1, 1, 1, '2024-06-07', '14:00', '16:30', 10, 'QR1'),
(2, 2, 1, 2, '2024-06-07', '17:00', '19:30', 12, 'QR2');

-- Inserting data into reservations table
INSERT INTO reservations (reservation_id, user_id, cinema_id, showtimes_id, seats_reserved, status) VALUES
(1, 1, 1, 1, 'A1', true),
(2, 2, 1, 2, 'B1', false);

-- Inserting data into incident table
INSERT INTO incident (incident_id, room_id, seat_id, user_id, description, report_date) VALUES
(1, 1, 1, 1, 'John Doe', '2024-06-01'),
(2, 2, 3, 2, 'Jane Smith', '2024-06-02');
