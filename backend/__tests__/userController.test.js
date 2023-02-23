const app = require("../src/app");
const request = require("supertest");

jest.mock("../src/services/userServices");

describe("user controller suite", () => {
  test("get all users", async () => {
    const response = await request(app).get("/users");

    expect(response.statusCode).toEqual(200);
    const users = response.body;
    expect(users.length).toBeGreaterThan(0);
    expect(users[0]._id).toBe("1");
  });

  test("post should return saved id", async () => {
    const user = {
      userName: "test001",
    };
    const response = await request(app).post("/users").send(user);

    expect(response.statusCode).toEqual(201);
    expect(response.body._id.length).toBe(24);

    let savedUser = await request(app).get("/users/" + response.body._id);
    expect(savedUser.body.createdAt).not.toBe(null);
    expect(savedUser.body.userName).toBe(user.userName);
  });

  test("get by id should return user", async () => {
    let response = await request(app).get("/users/1");
    const body = response.body;
    expect(body.createdAt).not.toBe(null);
    expect(body.userName).toBe("siam");
  });

  test("put should update an existing user", async () => {
    const user = {
      userName: "test003",
      id: "1",
    };
    const response = await request(app).put("/users").send(user);

    expect(response.statusCode).toEqual(200);

    let updatedUser = await request(app).get("/users/1");

    expect(updatedUser.body.createdAt).not.toBe(null);
    expect(updatedUser.body.userName).toBe(user.userName);
  });

  test("delete an user", async () => {
    const response = await request(app).delete("/users/1");

    expect(response.statusCode).toEqual(200);

    let deletedResponse = await request(app).get("/users/1");
    expect(deletedResponse.statusCode).toEqual(404);
    expect(deletedResponse.body.message).toEqual("User not found by the id: 1");
  });
});
