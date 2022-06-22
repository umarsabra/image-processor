import supertest from "supertest";

import app from "../main";

//Setting supertest object on the app instence
const request = supertest(app);

//Root route test
describe("Test root path status code", () => {
  it("Checks status code to be = 200", async () => {
    const res = await request.get("/");
    expect(res.status).toBe(200); //20- OK
  });
});

//Resize route tests
describe("Test /resize path status codes", () => {
  it("Checks status code without required query strings", async () => {
    const res = await request.get("/resize");
    expect(res.status).toBe(400); //Bad Request
  });

  it("Checks status with missing required query strings", async () => {
    const res = await request.get("/resize?name=cat&width=200");
    expect(res.status).toBe(400); //Bad Request
  });

  it("Checks status with wrong image name", async () => {
    const res = await request.get("/resize?name=omar&width=400&height=400");
    expect(res.status).toBe(404); //Not Found
  });
});
