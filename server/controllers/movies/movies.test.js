const request = require("supertest");
const app = require("../../app");
const DB = require("../../config/postgres.config");

describe("Movies api", () => {
    afterAll(async () => {
        await DB.closePool();
    });

    //test get movies
    describe("TEST get /movies", () => {
        test('Should respond with 200 ok ', async () => {
          await request(app)
          .get('/api/v1/movies')
          .expect("content-type", /json/)
          .expect(200);
        })
    });

    //test get movies by ID
    describe("TEST get /movies By ID", () => {
        test('should respond with 200 ok', async () => {
          await request(app)
          .get('/api/v1/movies/2')
          .expect("content-type", /json/)
          .expect(200)
        })

        test('should respond with 404 not found', async () => {
          await request(app)
          .get('/api/v1/movies/9999')
          .expect("content-type", /json/)
          .expect(404)
        })
        
    })
})