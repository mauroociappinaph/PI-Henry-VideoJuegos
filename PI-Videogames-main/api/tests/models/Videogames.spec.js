const { conn } = require("../../src/db");

//NOTE - Test para Base de Datos si anda la conexión.

describe("ConenctionDB", () => {
  test("Conexión a BD", async () => {
    try {
      await conn.authenticate();
      expect(true).toBe(true);
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  test("Datos subidos correctamente", async () => {
    try {
      await conn.query("SELECT 1 + 1");
      expect(true).toBe(true);
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });
});
