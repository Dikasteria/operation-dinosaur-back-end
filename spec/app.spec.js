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
    describe("POST", () => {
      it("adds a new device", () => {
        const device = { push_key: "84jjdjd" };
        return request
          .post("/api/devices/1")
          .send(device)
          .expect(201)
          .then(({ body: { device } }) => {
            expect(device).to.include.keys("id", "user_id", "push_key");
          });
      });
    });
  });
  describe("Schedule", () => {
    describe("GET", () => {
      it("gets all devices for a user", () => {
        return request
          .get("/api/meds/1")
          .expect(200)
          .then(({ body: { meds } }) => {
            expect(meds.length).to.equal(1);
            expect(meds[0]).to.contain.keys(
              "id",
              "user_id",
              "type",
              "due",
              "taken"
            );
          });
      });
    });
  });
});
