const request = require('supertest');
const app = require('../app');

let id;

test('GET /genres debe traer todos los generos', async () => {
  const res = await request(app).get('/genres');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /genres debe crear un género', async () => {
  const genre = { name: "Pop" }
  const res = await request(app).post('/genres').send(genre);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  // expect(res.body).toHaveProperty('name', genre.name);
  expect(res.body.name).toBe(genre.name);
});

test('PUT /genres/:id debe actualizar un género', async () => {
  const genreUpdated = { name: "Pop 2" }
  const res = await request(app).put(`/genres/${id}`).send(genreUpdated);
  expect(res.status).toBe(200);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(genreUpdated.name);
});

test('DELETE /genres/:id debe eliminar un géneroo', async () => {
  const res = await request(app).delete(`/genres/${id}`);
  expect(res.status).toBe(204);
});
