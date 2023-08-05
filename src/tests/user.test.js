const request = require("supertest");
const app = require("../app");
let id;
let token;

test("POST /users debe crear un usuario", async () => {
  const newUser = {
    firstName: "Mateo",
    lastName: "Melando",
    email: "mateo@gmail.com",
    password: "mateo1234",
    phone: "987654321",
  };
  const res = await request(app).post("/users").send(newUser);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe(newUser.firstName);
  expect(res.body.id).toBeDefined();
  expect(res.body.password).not.toBe(newUser.password);
});

test("POST /users/login debe logrear un usuario", async () => {
  const login = {
    email: "mateo@gmail.com",
    password: "mateo1234",
  };
  const res = await request(app).post("/users/login").send(login);
  token = res.body.token;
  expect(res.status).toBe(200);
  expect(res.body.token).toBeDefined();
});

test("GET /users debe traer todos los usuarios", async () => {
  const res = await request(app)
      .get("/users")
      .set('Authorization', `Bearer ${token}`);
  expect(res.statusCode).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("PUT /users/:id debe actualizar un usuario", async () => {
  const updateUser = {
    phone: "987654322",
  };
  const res = await request(app)
      .put(`/users/${id}`)
      .send(updateUser)
      .set('Authorization', `Bearer ${token}`);
  
  expect(res.status).toBe(200);
  expect(res.body.phone).toBe(updateUser.phone);
});

test("POST /users/login credenciales incorrectas", async () => {
  const login = {
    email: "icorrect@gmail.com",
    password: "incorrect1234",
  };
  const res = await request(app).post("/users/login").send(login);
  expect(res.status).toBe(401);
});

test("DELETE /users/:id debe eliminar un usuario", async () => {
  const res = await request(app)
      .delete(`/users/${id}`)
      .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
});
