const request = require("supertest");
const app = require("../../app");
const DB = require("../../config/postgres.config");

describe("TEST Rooms api", () => {
  let testRoomId;

  beforeAll(async () => {
    await DB.query(`INSERT INTO cinemas (cinema_id, name, location, country, images) VALUES
        (1, 'Cinema City', 'Downtown', 'USA', 'cinema_city.jpg'),
        (2, 'Movie Palace', 'Uptown', 'USA', 'movie_palace.jpg');`);

    await DB.query(`INSERT INTO  rooms (room_id, cinema_id, name, quality) VALUES
        (1, 1, 'Room 1', 'Standard'),
        (2, 1, 'Room 2', 'IMAX'),
        (3, 2, 'Room 1', 'Standard');`);
  });

  afterAll(async () => {
    await DB.query(`DELETE FROM rooms`);
    await DB.query(`DELETE FROM cinemas`);
    await DB.closePool();
  });

  afterEach(async () => {
    if (testRoomId) {
      const query = `DELETE FROM rooms WHERE room_id = $1`;
      await DB.query(query, [testRoomId]);
      testRoomId = undefined;
    }
  });

  // TEST Get Rooms
  describe("TEST Get /rooms", () => {
    test("should respond with 200 ok", async () => {
      await request(app)
        .get("/api/v1/rooms")
        .expect("content-type", /json/)
        .expect(200);
    });
  });

  // TEST Get Rooms By Id
  describe("TEST Get /rooms/:id", () => {
    test("Should respond with 200 ok", async () => {
      await request(app)
        .get("/api/v1/rooms/1")
        .expect("content-type", /json/)
        .expect(200);
    });
    test("Should respond with 404 /rooms/:id", async () => {
      await request(app)
        .get("/api/v1/rooms/1101")
        .expect("content-type", /json/)
        .expect(404);
    });
  });

  // TEST Post Rooms
  describe("TEST Post /rooms", () => {
    const roomsData = {
      cinema_id: 1,
      name: "A51",
      quality: "3D",
    };
    test("Should respond with 201 created", async () => {
      const response = await request(app)
        .post("/api/v1/rooms")
        .send(roomsData)
        .expect("content-type", /json/)
        .expect(201);

      testRoomId = response.body.room_id;
    });
    test("Should respond with 400", async () => {
      await request(app)
        .post("/api/v1/rooms")
        .send({})
        .expect("content-type", /json/)
        .expect(400);
    });
  });

  // TEST Update Rooms
  describe("TEST Update /rooms/:id", () => {
    const updatedRoomData = {
      cinema_id: 1,
      name: "A52",
      quality: "IMAX",
    };
    test("Should respond with 201 created", async () => {
      // First, we create a room to update
      const createResponse = await request(app)
        .post("/api/v1/rooms")
        .send({
          cinema_id: 1,
          name: "Temporary Room",
          quality: "2D",
        })
        .expect("content-type", /json/)
        .expect(201);

      testRoomId = createResponse.body.room_id;

      // Then, we update the created room
      await request(app)
        .put(`/api/v1/rooms/${testRoomId}`)
        .send(updatedRoomData)
        .expect("content-type", /json/)
        .expect(200);
    });
  });

  // TEST Delete Rooms
  describe("TEST Delete /rooms/:id", () => {
    test("Should respond with 200 ok", async () => {
      // First, we create a room to delete
      const createResponse = await request(app)
        .post("/api/v1/rooms")
        .send({
          cinema_id: 1,
          name: "Temporary Room",
          quality: "2D",
        })
        .expect("content-type", /json/)
        .expect(201);

      const roomIdToDelete = createResponse.body.room_id;

      // Then, we delete the created room
      await request(app)
        .delete(`/api/v1/rooms/${roomIdToDelete}`)
        .expect("content-type", /json/)
        .expect(200);

      // Finally, we verify the room was deleted
      await request(app)
        .get(`/api/v1/rooms/${roomIdToDelete}`)
        .expect("content-type", /json/)
        .expect(404);
    });

    test("Should respond with 404 for non-existing room", async () => {
      await request(app)
        .delete("/api/v1/rooms/9999") // Assuming 9999 does not exist
        .expect("content-type", /json/)
        .expect(404);
    });
  });
});
