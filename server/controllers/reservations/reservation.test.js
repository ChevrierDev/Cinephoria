const request = require("supertest");
const app = require("../../app");
const DB = require("../../config/postgres.config");

describe("TEST api /reservation", () => {
  let testReservationId;

  beforeAll(async () => {
    // Insérer les utilisateurs
    await DB.query(`INSERT INTO users (user_id, first_name, last_name, email, password, role) VALUES
            (1, 'John', 'Doe', 'john.doe@example.com', 'password123', 'admin'),
            (2, 'Jane', 'Smith', 'jane.smith@example.com', 'password123', 'user');`);

    // Insérer les cinémas
    await DB.query(`INSERT INTO cinemas (cinema_id, name, location, country, images) VALUES
            (1, 'Cinema City', 'Downtown', 'USA', 'cinema_city.jpg'),
            (2, 'Movie Palace', 'Uptown', 'USA', 'movie_palace.jpg');`);

    // Insérer les films
    await DB.query(`INSERT INTO movies (movie_id, title, duration, genre, pg, banner, poster, video, favorite, description, casting, release_date) VALUES
            (1, 'Inception', 148, 'Sci-Fi', 13, 'inception_banner.jpg', 'inception_poster.jpg', 'inception_trailer.mp4', false, 'A mind-bending thriller.', 'Leonardo DiCaprio, Joseph Gordon-Levitt', '2010-07-16'),
            (2, 'The Dark Knight', 152, 'Action', 13, 'dark_knight_banner.jpg', 'dark_knight_poster.jpg', 'dark_knight_trailer.mp4', false, 'A gripping action film.', 'Christian Bale, Heath Ledger', '2008-07-18');`);

    // Insérer les salles
    await DB.query(`INSERT INTO rooms (room_id, cinema_id, name, quality) VALUES
            (1, 1, 'Room 1', 'Standard'),
            (2, 1, 'Room 2', 'IMAX'),
            (3, 2, 'Room 1', 'Standard');`);

    // Insérer les séances
    await DB.query(`INSERT INTO showtimes (showtimes_id, movie_id, cinema_id, room_id, day, start_time, end_time, price, qr) VALUES
            (1, 1, 1, 1, '2024-06-07', '14:00', '16:30', 10, 'QR1'),
            (2, 2, 1, 2, '2024-06-07', '17:00', '19:30', 12, 'QR2');`);

    // Insérer les réservations
    await DB.query(`INSERT INTO reservations (reservation_id, user_id, cinema_id, showtimes_id, seats_reserved, status) VALUES
            (1, 1, 1, 1, 'A1', true),
            (2, 2, 1, 2, 'B1', false);`);
  });

  // Close connection to DB after testing
  afterAll(async () => {
    await DB.query("DELETE FROM reservations;");
    await DB.query("DELETE FROM showtimes;");
    await DB.query("DELETE FROM rooms;");
    await DB.query("DELETE FROM movies;");
    await DB.query("DELETE FROM cinemas;");
    await DB.query("DELETE FROM users;");
    await DB.closePool();
  });

  describe("Test Get /reservation", () => {
    test("should respond with 200", async () => {
      const response = await request(app)
        .get("/api/v1/reservation")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  //test get reservation by ID 
  describe("Test Get /reservation/:id", () => {
    test("should respond with 200", async () => {
      const response = await request(app)
        .get("/api/v1/reservation/1")
        .expect("Content-Type", /json/)
        .expect(200);
    });

    test("should respond with 404", async () => {
      const response = await request(app)
        .get("/api/v1/reservation/9999")
        .expect("Content-Type", /json/)
        .expect(404);

        expect(response.body).toEqual({message:"No reservation id found !"})
    });
  });

  //test post reservation 
  describe("Test POST /reservation", () => {
    beforeAll(async () => {
        await DB.query(`DELETE FROM reservations`);
      });
  
    test("should respond with 201 created", async () => {
        const insertReservation = {
            user_id: 1,
            cinema_id: 1,
            showtimes_id: 1,
            seats_reserved: "B24",
            status: true
          };

     const response = await request(app)
        .post("/api/v1/reservation")
        .send(insertReservation)
        .expect("Content-Type", /json/)
        .expect(201);

      testReviewId = response.body.review_id;
    });

    test("should respond with 400 bad request when missing fields", async () => {
        const emptyInsertReservation = {
          user_id: "",
          movie_id: "",
          rating: "",
          comment: "",
          status: "",
        };
  
        const response = await request(app)
          .post("/api/v1/reservation")
          .send(emptyInsertReservation)
          .expect("Content-Type", /json/)
          .expect(400);
      });
  });

  describe("Test DELETE /reservation api", () => {
    beforeEach(async () => {
        await DB.query(`DELETE FROM reservations`);
        await DB.query(`INSERT INTO reservations (reservation_id, user_id, cinema_id, showtimes_id, seats_reserved, status) VALUES
            (1, 1, 1, 1, 'A1', true)`);
      });
  
    test('should respond with 200 ok', async () => {
      const response = await request(app)
      .delete('/api/v1/reservation/1')
      .expect('content-type', /json/)
      .expect(200)

      expect(response.body).toEqual({message:"Reservation deleted successfully"});
    })

    test('should response with 404 fail', async () => {
      const response = await  request(app)
      .delete("/api/v1/reservation/9999")
      .expect("content-type", /json/)
      .expect(404)
    })  
  })

   // Tests pour UPDATE /reservation/:id
   describe("Test PUT /reservation/:id", () => {
    test("should respond with 200 ok and update a reservation", async () => {
      const updateReservation = {
        user_id: 2,
        cinema_id: 1,
        showtimes_id: 1,
        seats_reserved: "A2",
        status: true,
      };

      const response = await request(app)
        .put("/api/v1/reservation/1")
        .send(updateReservation)
        .expect("Content-Type", /json/)
        .expect(200);
    });

    test("should respond with 404 when reservation not found", async () => {
      const updateReservation = {
        user_id: 2,
        cinema_id: 1,
        showtimes_id: 1,
        seats_reserved: "A2",
        status: true,
      };

      const response = await request(app)
        .put("/api/v1/reservation/9999")
        .send(updateReservation)
        .expect("Content-Type", /json/)
        .expect(404);

      expect(response.body).toEqual({ message: "Reservation not found" });
    });

  });
});
