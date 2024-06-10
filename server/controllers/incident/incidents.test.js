const request = require("supertest");
const app = require("../../app");
const DB = require("../../config/postgres.config");

describe("TEST incident api", () => {
  let testIncidentId;

  beforeAll(async () => {
    await DB.query(`
      INSERT INTO users (user_id, first_name, last_name, email, password, role) VALUES
      (1, 'John', 'Doe', 'john.doe@example.com', 'password123', 'admin'),
      (2, 'Jane', 'Smith', 'jane.smith@example.com', 'password123', 'user');

      INSERT INTO cinemas (cinema_id, name, location, country, images) VALUES
      (1, 'Cinema City', 'Downtown', 'USA', 'cinema_city.jpg');

      INSERT INTO rooms (room_id, cinema_id, name, quality) VALUES
      (1, 1, 'Room 1', 'Standard');

      INSERT INTO seats (seat_id, room_id, seat_label, accessibility) VALUES
      (1, 1, 'A1', false);

      INSERT INTO incident (incident_id, room_id, seat_id, user_id, description, report_date) VALUES
      (1, 1, 1, 1, 'John Doe', '2024-06-01'),
      (2, 1, 1, 2, 'Jane Smith', '2024-06-02');
    `);
  });

  afterAll(async () => {
    await DB.query("DELETE FROM incident;");
    await DB.query("DELETE FROM seats;");
    await DB.query("DELETE FROM rooms;");
    await DB.query("DELETE FROM cinemas;");
    await DB.query("DELETE FROM users;");

    if (testIncidentId) {
      const query = `DELETE FROM incident WHERE incident_id = $1`;
      await DB.query(query, [testIncidentId]);
      testIncidentId = undefined;
    }

    await DB.closePool();
  });

  // Test GET incident
  describe("test GET /api/v1/incident", () => {
    test("should respond with status 200", async () => {
      const response = await request(app)
        .get("/api/v1/incident")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  // Test GET incident by ID
  describe("test GET /api/v1/incident/:id", () => {
    test("should respond with 200 ok", async () => {
      const response = await request(app)
        .get("/api/v1/incident/1")
        .expect("Content-Type", /json/)
        .expect(200);
    });

    test("should respond with 404 fail", async () => {
      const response = await request(app)
        .get("/api/v1/incident/9999")
        .expect("Content-Type", /json/)
        .expect(404);

      expect(response.body).toStrictEqual({
        message: "No incident id found!",
      });
    });
  });

  // Test POST incident
  describe("test POST /api/v1/incident", () => {
    const newIncident = {
      room_id: 1,
      seat_id: 1,
      user_id: 1,
      description: "New Incident",
      report_date: "2024-06-03",
    };
    const emptyNewIncident = {
      room_id: "",
      seat_id: "",
      user_id: "",
      description: "",
      report_date: "",
    };

    test("should respond with 201 created", async () => {
      const response = await request(app)
        .post("/api/v1/incident")
        .send(newIncident)
        .expect("Content-Type", /json/)
        .expect(201);

      testIncidentId = response.body.incident_id;
    });

    test("should respond with 404 error", async () => {
      const response = await request(app)
        .post("/api/v1/incident")
        .send(emptyNewIncident)
        .expect("Content-Type", /json/)
        .expect(404);

      expect(response.body).toStrictEqual({
        error: "You must enter all required fields!",
      });

      testIncidentId = response.body.incident_id;
    });
  });

  // Test DELETE incident
  describe('test DELETE /incident', () => {
    test('should respond with 200 ok', async () => {
      const newIncident = {
        room_id: 1,
        seat_id: 1,
        user_id: 1,
        description: "New Incident",
        report_date: "2024-06-03",
      };

      const postResponse = await request(app)
        .post("/api/v1/incident")
        .send(newIncident)
        .expect("Content-Type", /json/)
        .expect(201);

      testIncidentId = postResponse.body.incident_id;

      const deleteResponse = await request(app)
        .delete(`/api/v1/incident/${testIncidentId}`)
        .expect("Content-Type", /json/)
        .expect(200);

      expect(deleteResponse.body).toStrictEqual({
        message: "Incident deleted successfully",
      });
    });

    test("should respond with 404 fail", async () => {
      const response = await request(app)
        .delete("/api/v1/incident/9999")
        .expect("Content-Type", /json/)
        .expect(404);

      expect(response.body).toStrictEqual({
        error: "No incident found!",
      });
    });
  });

  // Test UPDATE incident
  describe('test PUT /api/v1/incident/:id', () => {
    test('should respond with 200 ok', async () => {
      const updatedIncident = {
        room_id: 1,
        seat_id: 1,
        user_id: 1,
        description: 'Updated Incident',
        report_date: '2024-06-04'
      };

      const response = await request(app)
        .put('/api/v1/incident/1')
        .send(updatedIncident)
        .expect('Content-Type', /json/)
        .expect(200);
    });

    test('should respond with 400 bad request', async () => {
      const incompleteIncident = {
        room_id: 1,
        seat_id: 1,
        user_id: 1,
        // description is missing
        report_date: '2024-06-04'
      };

      const response = await request(app)
        .put('/api/v1/incident/1')
        .send(incompleteIncident)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "You must enter all required fields!"
      });
    });

    test('should respond with 404 not found', async () => {
      const updatedIncident = {
        room_id: 1,
        seat_id: 1,
        user_id: 1,
        description: 'Updated Incident',
        report_date: '2024-06-04'
      };

      const response = await request(app)
        .put('/api/v1/incident/9999')
        .send(updatedIncident)
        .expect('Content-Type', /json/)
        .expect(404);

      expect(response.body).toStrictEqual({
        error: "No incident found!"
      });
    });
  });
});
