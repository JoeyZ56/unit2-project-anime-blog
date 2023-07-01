const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const server = app.listen(8000, () => console.log(`listening on ${server}`));
const Posts = require("../models/posts");
const User = require("../models/user");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  mongoServer.stop();
  server.close();
});

describe("Test the posts endpoint", () => {
  test("It should create a new post", async () => {
    const user = new User({
      name: "test1",
      email: "test1@email.com",
      password: "test123",
    });

    await user.save();

    const token = await user.generateAuthToken();

    const response = await request(app)
      .post("/posts")
      .send({
        title: "demon slayer",
        description: "is a good anime",
      })
      .set(`Authorization`, `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toEqual("demon slayer");
    expect(response.body.description).toEqual("is a good anime");
  });
  test("It should update a post", async () => {
    const user = new User({
      name: "test1",
      email: "test1@email.com",
      password: "test123",
    });

    await user.save();

    const token = await user.generateAuthToken();

    const posts = new Posts({
      title: "demon slayer",
      description: "is a good anime",
    });
    await posts.save();
    const response = await request(app)
      .put(`/posts/${posts._id}`)
      .set(`Authorization`, `Bearer ${token}`)
      .send({ title: "one piece", description: "is super long!" });
    expect(response.body.title).toEqual("one piece");
    expect(response.body.description).toEqual("is super long!");
  });
  test("It should delete a post", async () => {
    const user = new User({
      name: "test1",
      email: "test1@email.com",
      password: "test123",
    });
    await user.save();

    const token = await user.generateAuthToken();
    const posts = new Posts({
      title: "demon slayer",
      description: "is a good anime",
    });
    await posts.save();
    const response = await request(app)
      .delete(`/posts/${posts._id}`)
      .set(`Authorization`, `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual("your post has been removed!");
  });
});
