const request = require("supertest");
const app = require("../../app");
const DB = require("../../config/postgres.config");

describe("TEST seats api", () => {
  let seatsTestID;

  beforeAll(async () => {
    // Clear existing data to avoid primary key conflicts
    await DB.query(`DELETE FROM seats`);
    await DB.query(`DELETE FROM rooms`);
    await DB.query(`DELETE FROM cinemas`);

    // Insert into cinemas first
    await DB.query(`INSERT INTO cinemas (cinema_id, name, location, country, images) VALUES
          (1, 'Cinema City', 'Downtown', 'USA', 'cinema_city.jpg')`);

    // Then insert into rooms
    await DB.query(`INSERT INTO rooms (room_id, cinema_id, name, quality) VALUES
          (5, 1, 'Room 1', 'Standard')`);

    // Insert into seats
    await DB.query(`INSERT INTO seats (seat_id, room_id, seat_label, accessibility) VALUES
        (1, 5, 'A1', false)`);  // Change room_id to 5
    });

  afterAll(async () => {
    await DB.query(`DELETE FROM seats`);
    await DB.query(`DELETE FROM rooms`);
    await DB.query(`DELETE FROM cinemas`);
    if (seatsTestID) {
      const query = `DELETE FROM seats WHERE seat_id = $1`;
      await DB.query(query, [seatsTestID]);
      seatsTestID = undefined;
    }
    await DB.closePool();
  });

  // Test get showtimes
  describe("Test GET /seats", () => {
    test("should respond with 200", async () => {
      const response = await request(app)
        .get("/api/v1/seats")
        .expect("content-type", /json/)
        .expect(200);
    });
  });

  // Test get showtimes by ID
  describe("Test GET /seats/:id ", () => {
    test("should respond with 200", async () => {
      const response = await request(app)
        .get("/api/v1/seats/1")
        .expect("content-type", /json/)
        .expect(200);
    });

    test("should respond with 404", async () => {
      const response = await request(app)
        .get("/api/v1/seats/9999")
        .expect("content-type", /json/)
        .expect(404);

      expect(response.body).toEqual({ message:"No seat id found !" });
    });
  });

  // Test post showtimes
  describe("Test POST /seats", () => {
    const seatsTestData = {
        room_id: 5,  
        seat_label: "J35",
        accessibility: true, 
    };

    const emptyseatsTestData = {
        room_id: "",
        seat_label: "",
        accessibility: "", 
    };

    test("should respond with 201 created", async () => {
      const response = await request(app)
        .post("/api/v1/seats")
        .send(seatsTestData)
        .expect("Content-Type", /json/)
        .expect(201);

      seatsTestID = response.body.seat_id;  
    });

    test("should respond with 400 fail", async () => {  
      const response = await request(app)
        .post("/api/v1/seats")
        .send(emptyseatsTestData)
        .expect("Content-Type", /json/)
        .expect(400);
    });
  });

  //test UPDATE seats
  describe("TEST UPDATE /seats/:id", () => {
    const updateseatsTestData = {
        room_id: 5,  
        seat_label: "J35",
        accessibility: true, 
    };

    test("should respond with 200", async () => {
      const response = await request(app)
        .put("/api/v1/seats/1")
        .send(updateseatsTestData)
        .expect("Content-type", /json/)
        .expect(200);

      expect(response.body).toEqual({
        message: "Seat updated successfully",
      });
    });
  });

  //test DELETE seats
  describe("TEST DELETE /seats/:id", () => {
    test("should respond with 200 ok", async () => {
      const response = await request(app)
        .delete("/api/v1/seats/1")
        .expect("content-type", /json/)
        .expect(200);

      expect(response.body).toEqual({
        message: "seat deleted successfully",
      });
    });

    test("should respond with 404 fail", async () => {
      const response = await request(app)
        .delete("/api/v1/seats/999")
        .expect("content-type", /json/)
        .expect(404);

      expect(response.body).toEqual({ message: "No seat found !" });
    });
  });

});
