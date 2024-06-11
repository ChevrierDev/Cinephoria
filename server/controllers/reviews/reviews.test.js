const request = require("supertest");
const app = require("../../app");
const DB = require("../../config/postgres.config");

describe("TEST reviews API", () => {
  let testReviewId;

  beforeAll(async () => {
    await DB.query(`INSERT INTO users (user_id, first_name, last_name, email, password, role) VALUES
        (1, 'John', 'Doe', 'john.doe@example.com', 'password123', 'admin'),
        (2, 'Jane', 'Smith', 'jane.smith@example.com', 'password123', 'user');`);

    await DB.query(`INSERT INTO movies (movie_id, title, duration, genre, pg, banner, poster, video, favorite, description, casting, release_date) VALUES
        (1, 'Inception', 148, 'Sci-Fi', 13, 'inception_banner.jpg', 'inception_poster.jpg', 'inception_trailer.mp4', false, 'A mind-bending thriller.', 'Leonardo DiCaprio, Joseph Gordon-Levitt', '2010-07-16'),
        (2, 'The Dark Knight', 152, 'Action', 13, 'dark_knight_banner.jpg', 'dark_knight_poster.jpg', 'dark_knight_trailer.mp4', false, 'A heroic thriller.', 'Christian Bale, Heath Ledger', '2008-07-18');`);

    await DB.query(`
       INSERT INTO reviews (review_id, user_id, movie_id, rating, comment, status, created_at) VALUES
        (1, 1, 1, 5, 'Amazing movie!', true, CURRENT_TIMESTAMP),
        (2, 2, 2, 4, 'Great action scenes.', false, CURRENT_TIMESTAMP);
        `);
  });

  //close connection to DB after testing
  afterAll(async () => {
    await DB.query("DELETE FROM reviews;");
    await DB.query("DELETE FROM movies;");
    await DB.query("DELETE FROM users;");
    await DB.closePool();
  });

  //Get all reviews
  describe("Test GET /reviews", () => {
    test("should respond with 200 ok", async () => {
      const response = await request(app)
        .get("/api/v1/reviews")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  //Get  reviews By id
  describe("Test GET /reviews By id", () => {
    test("should respond with 200 ok", async () => {
      const response = await request(app)
        .get("/api/v1/reviews/1")
        .expect("Content-Type", /json/)
        .expect(200);
    });

    test("should respond with 404 fail", async () => {
      const response = await request(app)
        .get("/api/v1/reviews/9999")
        .expect("Content-Type", /json/)
        .expect(404);
      expect(response.body).toEqual({ message: "No reviews id found !" });
    });
  });

  //Post reviews
  describe("Test POST /reviews", () => {
    beforeAll(async () => {
      await DB.query(`DELETE FROM reviews`);
    });

    test("should respond with 201 created", async () => {
      const insertReviews = {
        user_id: 1,
        movie_id: 1,
        rating: 5,
        comment: "Very good movie",
        status: true,
      };

      const response = await request(app)
        .post("/api/v1/reviews")
        .send(insertReviews)
        .expect("Content-Type", /json/)
        .expect(201);

      testReviewId = response.body.review_id;
    });

    test("should respond with 400 bad request when missing fields", async () => {
      const emptyInsertReviews = {
        user_id: "",
        movie_id: "",
        rating: "",
        comment: "",
        status: "",
      };

      const response = await request(app)
        .post("/api/v1/reviews")
        .send(emptyInsertReviews)
        .expect("Content-Type", /json/)
        .expect(400);
    });
  });

    //Test DELETE /reviews
   describe("Test DELETE /reviews", () => {
    beforeEach(async () => {
      await DB.query(`DELETE FROM reviews`);
      await DB.query(`
         INSERT INTO reviews (review_id, user_id, movie_id, rating, comment, status, created_at) VALUES
          (1,1, 1, 5, 'Amazing movie!', true, CURRENT_TIMESTAMP);
          `);
    });

    test("should respond with 200 ok when review is deleted", async () => {
      const response = await request(app)
        .delete('/api/v1/reviews/1')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual({message:"Review deleted successfully"});
    });

    test('should respond with 404 fail when review not found', async () => {
      const response = await request(app)
        .delete("/api/v1/reviews/9999")
        .expect("Content-Type", /json/)
        .expect(404);

      expect(response.body).toEqual({message:"No review found!"});
    });
  });

  // Update reviews
  describe("Test PUT /reviews/:id", () => {
    beforeEach(async () => {
      await DB.query(`DELETE FROM reviews`);
      await DB.query(`
         INSERT INTO reviews (review_id, user_id, movie_id, rating, comment, status, created_at) VALUES
          (1, 1, 1, 5, 'Amazing movie!', true, CURRENT_TIMESTAMP);
          `);
    });

    test("should respond with 200 ok when review is updated", async () => {
      const updateReview = {
        user_id: 1,
        movie_id: 1,
        rating: 4,
        comment: "Good movie!",
        status: true,
      };

      const response = await request(app)
        .put('/api/v1/reviews/1')
        .send(updateReview)
        .expect('Content-Type', /json/)
        .expect(200);

    });

    test('should respond with 404 when review not found', async () => {
      const updateReview = {
        user_id: 1,
        movie_id: 1,
        rating: 4,
        comment: "Good movie!",
        status: true,
      };

      const response = await request(app)
        .put("/api/v1/reviews/9999")
        .send(updateReview)
        .expect("Content-Type", /json/)
        .expect(404);

      expect(response.body).toEqual({message: "Reviews with this provided ID does not exist."});
    });
  });
});
