const request = require('supertest');
const app = require('../app');

let id;

test('GET /albums debe traer todos los albums', async () => {
  const res = await request(app).get('/albums');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /albums debe crear un album', async () => {
  const album = {
    name: "Thriller",
    releaseYear: 1982,
    image: 'https://image.jpg',
  }
  const res = await request(app).post('/albums').send(album);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(album.name);
});

test('PUT /albums/:id debe actualizar un album', async () => {
  const albumUpdated = { name: "Thriller updated" }
  const res = await request(app).put(`/albums/${id}`).send(albumUpdated);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(albumUpdated.name);
});

test('DELETE /albums/:id debe eliminar un album', async() => {
  const res = await request(app).delete(`/albums/${id}`);
  expect(res.status).toBe(204);
});
