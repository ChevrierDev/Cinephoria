const request = require("supertest");
const app = require("../../app");
const DB = require("../../config/postgres.config");
const { validateUser } = require("../../middlewares/validator/users.validator");
const {
  hashPassword,
  compareHashedPassword,
} = require("../../utils/hashPassword");

function generateUniqueEmail() {
  const timestamp = Date.now();
  return `user${timestamp}@test.com`;
}

describe("Users API", () => {
  let testUserId;

  afterAll(async () => {
    await DB.closePool();
  });

  afterEach(async () => {
    if (testUserId) {
      await DB.query("DELETE FROM users WHERE user_id = $1", [testUserId]);
      testUserId = undefined;
    }
  });

  // Test GET all users
  describe("Test GET /users", () => {
    test("should respond with 200 success", async () => {
      await request(app)
        .get("/api/v1/users")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  // Test GET user by ID
  describe("Test GET /users By ID", () => {
    const wrongUserID = "/api/v1/users/99999";

    test("should respond with 400 fail for non-existent user", async () => {
      await request(app)
        .get(wrongUserID)
        .expect("Content-Type", /text/)
        .expect(400);
    });
  });

  // Test POST user
  describe("Test POST /users", () => {
    const uniqueEmail = generateUniqueEmail();
    const completeUserData = {
      first_name: "Sasha",
      last_name: "Pokemon",
      email: uniqueEmail,
      password: "Azerty-123",
      role: "admin",
    };

    const missingUserData = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role: "",
    };

    test("should respond with 201 success", async () => {
      const response = await request(app)
        .post("/api/v1/users")
        .send(completeUserData)
        .expect("Content-Type", /json/)
        .expect(201);

      expect(response.body).toHaveProperty("first_name", "Sasha");
      expect(response.body).toHaveProperty("last_name", "Pokemon");
      expect(response.body).toHaveProperty("email", uniqueEmail);
      expect(response.body).toHaveProperty("role", "admin");

      testUserId = response.body.user_id;
    });

    test("should respond with 400 fail", async () => {
      const response = await request(app)
        .post("/api/v1/users")
        .send(missingUserData)
        .expect("Content-Type", /json/)
        .expect(400);
    });
  });

  // Test DELETE user by ID
  describe("Test DELETE /users/:id", () => {
    test("should respond with 200 success", async () => {
      // Create a new user to be deleted
      const uniqueEmail = generateUniqueEmail();
      const completeUserData = {
        first_name: "Test",
        last_name: "User",
        email: uniqueEmail,
        password: "Test1234",
        role: "admin",
      };

      const createUserResponse = await request(app)
        .post("/api/v1/users")
        .send(completeUserData)
        .expect("Content-Type", /json/)
        .expect(201);

      testUserId = createUserResponse.body.user_id;

      // Delete the user
      const deleteResponse = await request(app)
        .delete(`/api/v1/users/${testUserId}`)
        .expect("Content-Type", /json/)
        .expect(200);

      expect(deleteResponse.body).toStrictEqual({
        message: "User deleted successfully!",
      });
    });

    test("should respond with 404 for non-existent user", async () => {
      await request(app)
        .delete(`/api/v1/users/99999`)
        .expect("Content-Type", /json/)
        .expect(404);
    });
  });

  // Test UPDATE user by ID
  describe("Test UPDATE /users/:id", () => {
    test("should respond with 200 success", async () => {
      // Create a new user to be updated
      const uniqueEmail = generateUniqueEmail();
      const completeUserData = {
        first_name: "Test",
        last_name: "User",
        email: uniqueEmail,
        password: "Test1234",
        role: "admin",
      };

      const createUserResponse = await request(app)
        .post("/api/v1/users")
        .send(completeUserData)
        .expect("Content-Type", /json/)
        .expect(201);

      testUserId = createUserResponse.body.user_id;

      const updateUserData = {
        first_name: "Test123",
        last_name: "User123",
        email: uniqueEmail,
        password: "Test1234",
        role: "admin",
      };

      const updateUserResponse = await request(app)
        .put(`/api/v1/users/${testUserId}`)
        .send(updateUserData)
        .expect("Content-Type", /json/)
        .expect(200);

      expect(updateUserResponse.body).toHaveProperty("first_name", "Test123");
      expect(updateUserResponse.body).toHaveProperty("last_name", "User123");
      expect(updateUserResponse.body).toHaveProperty("email", uniqueEmail);
      expect(updateUserResponse.body.password).not.toBe(
        completeUserData.password
      );
      const passwordMatch = await compareHashedPassword(
        updateUserData.password,
        updateUserResponse.body.password
      );
      expect(passwordMatch).toBe(true);
      expect(updateUserResponse.body).toHaveProperty("role", "admin");

      // Delete the user
      const deleteResponse = await request(app)
        .delete(`/api/v1/users/${testUserId}`)
        .expect("Content-Type", /json/)
        .expect(200);
    });

    //update user with the same data
    test("should respond with 400 fail", async () => {
      // Create a new user to be updated
      const uniqueEmail = generateUniqueEmail();
      const completeUserData = {
        first_name: "Test",
        last_name: "User",
        email: uniqueEmail,
        password: "Test1234",
        role: "admin",
      };

      const createUserResponse = await request(app)
        .post("/api/v1/users")
        .send(completeUserData)
        .expect("Content-Type", /json/)
        .expect(201);

      testUserId = createUserResponse.body.user_id;

      const updateUserData = {
        first_name: "Test",
        last_name: "User",
        email: uniqueEmail,
        password: "Test1234",
        role: "admin",
      };

      const updateUserResponse = await request(app)
        .put(`/api/v1/users/${testUserId}`)
        .send(updateUserData)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(updateUserResponse.body).toStrictEqual({
        message: "You must update with different data.",
      });

      // Delete the user
      const deleteResponse = await request(app)
        .delete(`/api/v1/users/${testUserId}`)
        .expect("Content-Type", /json/)
        .expect(200);
    });

    //update user with invalid ID
    test("Should respond with 404 failure", async () => {
      const completeUserData = {
        first_name: "Test",
        last_name: "User",
        email: "blabla@hotmail.com",
        password: "Test1234",
        role: "admin",
      };

      const updateUserById = await request(app)
        .put(`/api/v1/users/9999`)
        .send(completeUserData)
        .expect("Content-Type", /json/)
        .expect(404);

      expect(updateUserById.body).toStrictEqual({
        message: "User not found",
      });
    });
  });
});
