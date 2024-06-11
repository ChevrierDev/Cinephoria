const request = require("supertest");
const app = require("../../app");
const DB = require("../../config/postgres.config");

describe("TEST showtimes api", () => {
  let showtimesTestID;

  beforeAll(async () => {
    // Clear existing data to avoid primary key conflicts
    await DB.query(`DELETE FROM showtimes`);
    await DB.query(`DELETE FROM movies`);
    await DB.query(`DELETE FROM rooms`);
    await DB.query(`DELETE FROM cinemas`);

    // Insert into cinemas first
    await DB.query(`INSERT INTO cinemas (cinema_id, name, location, country, images) VALUES
          (1, 'Cinema City', 'Downtown', 'USA', 'cinema_city.jpg')`);

    // Then insert into rooms
    await DB.query(`INSERT INTO rooms (room_id, cinema_id, name, quality) VALUES
          (5, 1, 'Room 1', 'Standard')`);

    // Insert into movies
    await DB.query(`INSERT INTO movies (movie_id, title, duration, genre, pg, banner, poster, video, favorite, description, casting, release_date) VALUES
          (1, 'Inception', 148, 'Sci-Fi', 13, 'inception_banner.jpg', 'inception_poster.jpg', 'inception_trailer.mp4', false, 'A mind-bending thriller.', 'Leonardo DiCaprio, Joseph Gordon-Levitt', '2010-07-16')`);

    await DB.query(`INSERT INTO showtimes (showtimes_id, movie_id, cinema_id, room_id, day, start_time, end_time, price, qr) VALUES
        (1, 1, 1, 5, '2024-06-07', '14:00', '16:30', 10, 'QR1')`);
  });

  afterAll(async () => {
    await DB.query(`DELETE FROM showtimes`);
    await DB.query(`DELETE FROM movies`);
    await DB.query(`DELETE FROM rooms`);
    await DB.query(`DELETE FROM cinemas`);
    if (showtimesTestID) {
      const query = `DELETE FROM showtimes WHERE showtimes_id = $1`;
      await DB.query(query, [showtimesTestID]);
      showtimesTestID = undefined;
    }
    await DB.closePool();
  });

  // Test get showtimes
  describe("Test GET /showtimes", () => {
    test("should respond with 200", async () => {
      const response = await request(app)
        .get("/api/v1/showtimes")
        .expect("content-type", /json/)
        .expect(200);
    });
  });

  // Test get showtimes by ID
  describe("Test GET /showtimes/:id ", () => {
    test("should respond with 200", async () => {
      const response = await request(app)
        .get("/api/v1/showtimes/1")
        .expect("content-type", /json/)
        .expect(200);
    });

    test("should respond with 404", async () => {
      const response = await request(app)
        .get("/api/v1/showtimes/9999")
        .expect("content-type", /json/)
        .expect(404);

      expect(response.body).toEqual({ message: "No showtimes id found !" });
    });
  });

  // Test post showtimes
  describe("Test POST /showtimes", () => {
    const showtimesTestData = {
      movie_id: 1,
      cinema_id: 1,
      room_id: 5,
      day: "2024/12/06",
      start_time: "16:30",
      end_time: "18:00",
      price: 15,
      qr: "qr_images_1.png", 
    };

    const emptyShowtimesTestData = {
      movie_id: "",
      cinema_id: "",
      room_id: "",
      day: "",
      start_time: "",
      end_time: "",
      price: "",
      qr: "",
    };

    test("should respond with 201 created", async () => {
      const response = await request(app)
        .post("/api/v1/showtimes")
        .send(showtimesTestData)
        .expect("Content-Type", /json/)
        .expect(201);

      showtimesTestID = response.body.showtimes_id;
    });

    test("should respond with 404 fail", async () => {
      const response = await request(app)
        .post("/api/v1/showtimes")
        .send(emptyShowtimesTestData)
        .expect("Content-Type", /json/)
        .expect(400);
    });
  });

  //test UPDATE showtimes
  describe("TEST UPDATE /showtimes/:id", () => {
    const updateShowtimesTestData = {
      movie_id: 1,
      cinema_id: 1,
      room_id: 5,
      day: "2024/05/06",
      start_time: "16:50",
      end_time: "18:00",
      price: 15,
      qr: "qr_images_2.png", 
    };

    test("should respond with 200", async () => {
      const response = await request(app)
        .put("/api/v1/showtimes/1")
        .send(updateShowtimesTestData)
        .expect("Content-type", /json/)
        .expect(200);

      expect(response.body).toEqual({
        message: "showtimes updated successfully",
      });
    });
  });

  //test DELETE showtimes
  describe("TEST DELETE /showtimes/:id", () => {
    test("should respond with 200 ok", async () => {
      const response = await request(app)
        .delete("/api/v1/showtimes/1")
        .expect("content-type", /json/)
        .expect(200);

      expect(response.body).toEqual({
        message: "showtimes deleted successfully",
      });
    });

    test("should respond with 404 fail", async () => {
      const response = await request(app)
        .delete("/api/v1/showtimes/999")
        .expect("content-type", /json/)
        .expect(404);

      expect(response.body).toEqual({ message: "No showtimes found !" });
    });
  });

});
