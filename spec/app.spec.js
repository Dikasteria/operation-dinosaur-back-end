process.env.NODE_ENV = "test";
const { app } = require("../app");
const request = require("supertest")(app);
const chai = require("chai");
const { expect } = require("chai");
const chaiSorted = require("chai-sorted");
const { connection } = require("../server/connection");

chai.use(chaiSorted);

describe("/API", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("USERS", () => {
    describe("POST", () => {
      it("adds a new user", () => {
        const user = { first_name: "Alex", surname: "Jones" };
        return request
          .post("/api/users")
          .send(user)
          .expect(201)
          .then(({ body: { user } }) => {
            expect(user).to.include.keys("id", "first_name", "surname");
          });
      });
    });
  });
});
