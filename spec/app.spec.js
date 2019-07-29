process.env.NODE_ENV = "test";
const { app } = require("../app");
const request = require("supertest")(app);
const chai = require("chai");
const { expect } = require("chai");
const chaiSorted = require("chai-sorted");
const { connection } = require("../server/connection");

chai.use(chaiSorted);

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("users", () => {
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
  describe("/devices/:user_id", () => {
    describe("GET", () => {
      it("gets all devices for a user", () => {
        return request
          .get("/api/devices/1")
          .expect(200)
          .then(({ body: { devices } }) => {
            expect(devices.length).to.equal(2);
            expect(devices[0]).to.contain.keys("id", "user_id", "push_key");
          });
      });
    });
  });
});
