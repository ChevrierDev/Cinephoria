const request = require("supertest");
const app = require("../../app");
const DB = require("../../config/postgres.config");
describe("TEST cinemas api", () => {
  let cinemaId;
  //close connection to DB after testing
  afterAll(async () => {
    await DB.closePool();
  });

  afterEach(async () => {
    if (cinemaId) {
      const query = "DELETE FROM cinemas WHERE cinema_id = $1";
      await DB.query(query, [cinemaId]);
      cinemaId = undefined;
    }
  });

  //get all cinemas
  describe("Test GET /cinemas", () => {
    test("should respond with 200 ok", async () => {
      await request(app)
        .get("/api/v1/cinemas")
        .expect("content-type", /json/)
        .expect(200);
    });
  });

  //test get cinemas by id
  describe("test GET /cinemas by id", () => {
    test("should respond with 200 ok", async () => {
      await request(app)
        .get("/api/v1/cinemas/4")
        .expect("content-type", /json/)
        .expect(200);
    });

    test("should respond with 400 fail", async () => {
      const cinemasById = await request(app)
        .get("/api/v1/cinemas/999")
        .expect("content-type", /json/)
        .expect(400);
      expect(cinemasById.body).toStrictEqual({
        message: "No cinema found !",
      });
    });
  });

  //test post cinemas
  describe("test POST /cinemas", () => {
    const cinemasData = {
      name: "LaRocheuse",
      location: "Ville Franche",
      country: "France",
      images: "cinemas_belgique.png",
    };

    const cinemasWhitoutData = {
      name: "",
      location: "",
      country: "",
      images: "",
    };

    test("should respond with respond 201 created", async () => {
      const postCinema = await request(app)
        .post("/api/v1/cinemas")
        .send(cinemasData)
        .expect("content-type", /json/)
        .expect(201);

      expect(postCinema.body).toMatchObject({
        name: "LaRocheuse",
        location: "Ville Franche",
        country: "France",
        images: "cinemas_belgique.png",
      });

      cinemaId = postCinema.body.cinema_id;
    });

    test("should respond with respond 400 fail", async () => {
      const postCinemaWitoutData = await request(app)
        .post("/api/v1/cinemas")
        .send(cinemasWhitoutData)
        .expect("content-type", /json/)
        .expect(400);
    });
  });

  //test delete cinema
  describe("test DELETE /cinemas/:id", () => {
    test("should respond with respond 200", async () => {
      const cinemasData = {
        name: "LaRocheuse",
        location: "Ville Franche",
        country: "France",
        images: "cinemas_belgique.png",
      };

      const createTestCinema = await request(app)
        .post("/api/v1/cinemas")
        .send(cinemasData)
        .expect("content-type", /json/)
        .expect(201);

      cinemaId = createTestCinema.body.cinema_id;

      const deleteTestCinema = await request(app)
        .delete(`/api/v1/cinemas/${cinemaId}`)
        .expect(200);

      expect(deleteTestCinema.body).toStrictEqual({
        message: "Cinema deleted successfully!",
      });
    });

    test("should respond with 400 fail", async () => {
      const deleteCinemaWithoutId = await request(app)
        .delete("/api/v1/cinemas/9999")
        .expect("content-type", /json/)
        .expect(404);
      expect(deleteCinemaWithoutId.body).toStrictEqual({
        error: "No cinema found with this provided ID!",
      });
    });
  });

  //test update cinema
  describe("test PUT /cinemas/:id", () => {
    test("should respond with 200 success ", async () => {
      const testCinemasData = {
        name: "LaRocheuse",
        location: "Ville Franche",
        country: "France",
        images: "cinemas_belgique.png",
      };

      const updateTestCinemasData = {
        name: "LaRocheuserai",
        location: "Ville Franchez",
        country: "Belgique",
        images: "cinemas_belgique.png",
      };

      const createTestCinema = await request(app)
        .post("/api/v1/cinemas")
        .send(testCinemasData)
        .expect("content-type", /json/)
        .expect(201);

      cinemaId = createTestCinema.body.cinema_id;

      const update = await request(app)
        .put(`/api/v1/cinemas/${cinemaId}`)
        .send(updateTestCinemasData)
        .expect("content-type", /json/)
        .expect(200);
    });

    test("should respond with 400 fail", async () => {
      const updateTestCinemasData = {
        name: "LaRocheuserai",
        location: "Ville Franchez",
        country: "Belgique",
        images: "cinemas_belgique.png",
      };
      const updateWrongId = await request(app)
        .put("/api/v1/cinemas/9999")
        .send(updateTestCinemasData)
        .expect("content-type", /json/)
        .expect(400);

      expect(updateWrongId.body).toStrictEqual({
        message: "Cinema not found",
      });
    });

    test("should respond with 404 fail", async () => {
      const testCinemasData = {
        name: "LaRocheuse",
        location: "Ville Franche",
        country: "France",
        images: "cinemas_belgique.png",
      };

      const updateTestCinemasData = {
        name: "LaRocheuserai",
        location: "Ville Franchez",
        country: "Belgique",
        images: "cinemas_belgique.png",
      };

      const createTestCinema = await request(app)
        .post("/api/v1/cinemas")
        .send(testCinemasData)
        .expect("content-type", /json/)
        .expect(201);

      cinemaId = createTestCinema.body.cinema_id;

      const updateWrongId = await request(app)
        .put(`/api/v1/cinemas/${cinemaId}`)
        .send(testCinemasData)
        .expect("content-type", /json/)
        .expect(404);

      expect(updateWrongId.body).toStrictEqual({
        message: "You must update with different data.",
      });
    });
  });
});
