const expect = require("chai").expect;
var request = require("supertest");
let host = "http://localhost:3000/api/exercise";

describe("addExercise test", () => {
  const userId = "PdkJ_qr0v";
  it("Should return error for invalid userId", done => {
    request(`${host}`)
      .post("/add")
      .send({ userId: "wrongUserIdqsdf" })
      .expect(400)
      .expect(res => {
        expect(res.text).equal("unknown _id");
      })
      .end(done);
  });

  it.only("Should return error when description doesn't given", done => {
    request(`${host}`)
      .post("/add")
      .send({ userId: userId })
      .expect(400)
      .expect(res => {
        expect(res.text).equal("Path `description` is required.");
      })
      .end(done);
  });
  it.only("Should return error when duration doesn't given", done => {
    request(`${host}`)
      .post("/add")
      .send({ userId: userId, description: "aa" })
      .expect(400)
      .expect(res => {
        expect(res.text).equal("Path `duration` is required.");
      })
      .end(done);
  });
  it.only("Should return error when duration type is not number", done => {
    request(`${host}`)
      .post("/add")
      .send({ userId: userId, description: "aa", duration: "a" })
      .expect(400)
      .expect(res => {
        expect(res.text).equal(
          `Cast to Number failed for value "a" at path "duration"`
        );
      })
      .end(done);
  });
  it.only("Should return error when date type is not valid", done => {
    request(`${host}`)
      .post("/add")
      .send({ userId: userId, description: "aa", duration: 2, date: "mlkqjs" })
      .expect(400)
      .expect(res => {
        expect(res.text).equal(
          `Cast to Date failed for value "mlkqjs" at path "date"`
        );
      })
      .end(done);
  });
});
