const request = require("supertest");
const app = require("../../src/app");

describe("Ruta Videogames", () => {
  it("Debe retornar un status 200 en la ruta Videogames", async () => {
    const response = await request(app).get("/videogames");
    expect(response.statusCode).toEqual(200);
  });
});

describe("Ruta Genres", () => {
  it("Debe retornar un status 200 en la ruta Genres", async () => {
    const response = await request(app).get("/genres");
    expect(response.statusCode).toEqual(200);
  });
});
describe("Ruta Plataforms", () => {
  it("Debe retornar un status 200 en la ruta Plataforms", async () => {
    const response = await request(app).get("/platforms");
    expect(response.statusCode).toEqual(200);
  });
});
