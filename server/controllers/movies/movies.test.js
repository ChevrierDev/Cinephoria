const request = require("supertest");
const app = require("../../app");
const DB = require("../../config/postgres.config");

describe("TEST Movies api", () => {
  let testMovieId;


    beforeAll(async () => {
    await DB.query(`INSERT INTO movies (movie_id, title, duration, genre, pg, banner, poster, video, favorite, description, casting, release_date) VALUES
        (3, 'Inception', 148, 'Sci-Fi', 13, 'inception_banner.jpg', 'inception_poster.jpg', 'inception_trailer.mp4', false, 'A mind-bending thriller.', 'Leonardo DiCaprio, Joseph Gordon-Levitt', '2010-07-16')`);
    });

  //close connection to DB after testing
  afterAll(async () => {
    await DB.query("DELETE FROM movies;");
    await DB.closePool();
  });
  
  afterEach(async () => {
    if (testMovieId) {
      await DB.query("DELETE FROM users WHERE user_id = $1", [testMovieId]);
      testMovieId = undefined;
    }
  });

  //test get movies
  describe("TEST get /movies", () => {
    test("Should respond with 200 ok ", async () => {
      await request(app)
        .get("/api/v1/movies")
        .expect("content-type", /json/)
        .expect(200);
    });
  });

  //test get movies by ID
  describe("TEST get /movies By ID", () => {
    test("should respond with 200 ok", async () => {
      await request(app)
        .get("/api/v1/movies/3")
        .expect("content-type", /json/)
        .expect(200);
    });

    test("should respond with 404 not found", async () => {
      await request(app)
        .get("/api/v1/movies/9999")
        .expect("content-type", /json/)
        .expect(404);
    });
  });

  //test post movies
  describe("Test POST /users", () => {
    const completeMovieData = {
      title: "Bara",
      duration: "120",
      genre: "Action",
      pg: 12,
      banner: "bara.banner.jpg",
      poster: "bara.poster.jpg",
      video: "bara.poster.mp4",
      favorite: true,
      description: "barapapa",
      casting: "Liam nesson",
      release_date: "19/12/2024",
    };

    const missingMovieData = {
      title: "",
      duration: "",
      genre: "",
      pg: "",
      banner: "",
      poster: "",
      video: "",
      favorite: "",
      description: "",
      casting: "",
      release_date: "",
    };

    test("should respond with 201 created", async () => {
      const response = await request(app)
        .post("/api/v1/movies")
        .send(completeMovieData)
        .expect("Content-Type", /json/)
        .expect(201);

      const expectedReleaseDate = "19/12/2024";
      const receivedReleaseDate = new Date(
        response.body.release_date
      ).toLocaleDateString("en-GB");

      expect(response.body).toHaveProperty("title", "Bara");
      expect(response.body).toHaveProperty("duration", 120);
      expect(response.body).toHaveProperty("genre", "Action");
      expect(response.body).toHaveProperty("pg", 12);
      expect(response.body).toHaveProperty("banner", "bara.banner.jpg");
      expect(response.body).toHaveProperty("poster", "bara.poster.jpg");
      expect(response.body).toHaveProperty("video", "bara.poster.mp4");
      expect(response.body).toHaveProperty("favorite", true);
      expect(response.body).toHaveProperty("description", "barapapa");
      expect(response.body).toHaveProperty("casting", "Liam nesson");
      expect(receivedReleaseDate).toBe(expectedReleaseDate);

      testMovieId = response.body.movie_id;
    });

    test("should respond with 400 fail", async () => {
      const response = await request(app)
        .post("/api/v1/movies")
        .send(missingMovieData)
        .expect("Content-Type", /json/)
        .expect(400);
    });
  });

  // Test DELETE user by ID
  describe("Test DELETE /movies/:id", () => {
    test("should respond with 200 success", async () => {
      const completeMovieData = {
        title: "Bara",
        duration: "120",
        genre: "Action",
        pg: 12,
        banner: "bara.banner.jpg",
        poster: "bara.poster.jpg",
        video: "bara.poster.mp4",
        favorite: true,
        description: "barapapa",
        casting: "Liam nesson",
        release_date: "19/12/2024",
      };

      const movie = await request(app)
        .post("/api/v1/movies")
        .send(completeMovieData)
        .expect("Content-Type", /json/)
        .expect(201);
      testMovieId = movie.body.movie_id;

      // Delete the Movies
      await request(app)
        .delete(`/api/v1/movies/${testMovieId}`)
        .expect("Content-Type", /json/)
        .expect(200);
    });

    test("should respond with 404 for non-existent Movies", async () => {
      await request(app)
        .delete(`/api/v1/movies/99999`)
        .expect("Content-Type", /json/)
        .expect(404);
    });
  });

  // Test update movie
  describe("Test UPDATE /movies/:id", () => {
    test("should respond with 200 success", async () => {
      // Create a new movie to be updated
      const completeMovieData = {
        title: "Bara",
        duration: "120",
        genre: "Action",
        pg: 12,
        banner: "bara.banner.jpg",
        poster: "bara.poster.jpg",
        video: "bara.poster.mp4",
        favorite: true,
        description: "barapapa",
        casting: "Liam nesson",
        release_date: "19/12/2024",
      };

      const createMovieResponse = await request(app)
        .post("/api/v1/movies")
        .send(completeMovieData)
        .expect("Content-Type", /json/)
        .expect(201);

      testMovieId = createMovieResponse.body.movie_id;

      const updateMovieData = {
        title: "Bara Updated",
        duration: "130",
        genre: "Thriller",
        pg: 15,
        banner: "bara.updated.banner.jpg",
        poster: "bara.updated.poster.jpg",
        video: "bara.updated.poster.mp4",
        favorite: false,
        description: "barapapa updated",
        casting: "Liam nesson updated",
        release_date: "20/12/2024",
      };

      const updateMovieResponse = await request(app)
        .put(`/api/v1/movies/${testMovieId}`)
        .send(updateMovieData)
        .expect("Content-Type", /json/)
        .expect(200);

      const expectedReleaseDate = "20/12/2024";
      const receivedReleaseDate = new Date(
        updateMovieResponse.body.release_date
      ).toLocaleDateString("en-GB");

    });

    test("should respond with 400 fail", async () => {
      const completeMovieData = {
        title: "Bara",
        duration: "120",
        genre: "Action",
        pg: 12,
        banner: "bara.banner.jpg",
        poster: "bara.poster.jpg",
        video: "bara.poster.mp4",
        favorite: true,
        description: "barapapa",
        casting: "Liam nesson",
        release_date: "19/12/2024",
      };

      const createMovieResponse = await request(app)
        .post("/api/v1/movies")
        .send(completeMovieData)
        .expect("Content-Type", /json/)
        .expect(201);

      testMovieId = createMovieResponse.body.movie_id;

      const updateMovieData = {
        title: "Bara",
        duration: "120",
        genre: "Action",
        pg: 12,
        banner: "bara.banner.jpg",
        poster: "bara.poster.jpg",
        video: "bara.poster.mp4",
        favorite: true,
        description: "barapapa",
        casting: "Liam nesson",
        release_date: "19/12/2024",
      };

      const updateMovieResponse = await request(app)
        .put(`/api/v1/movies/${testMovieId}`)
        .send(updateMovieData)
        .expect("Content-Type", /json/)
        .expect(200);

    });

    
  });
});
