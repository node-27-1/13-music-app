const request = require('supertest');
const app = require('../app');

let id;

test('GET /artists debe traer todos los artistas', async () => {
  const res = await request(app).get('/artists');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /artists debe crear un artista', async () => {
  const artist = {
    name: "Michael Jackson",
    formationYear: 1975,
    country: "United States",
    image: "https://michael.com/image.jpg"
  }
  const res = await request(app).post('/artists').send(artist);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(artist.name);
});

test('PUT /artists/:id debe actualizar un artista', async () => {
  const artistUpdated = {
    name: "Michael updated"
  }
  const res = await request(app).put(`/artists/${id}`).send(artistUpdated);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(artistUpdated.name);
});

test('DELETE /artists/:id debe eliminar un artista', async () => {
  const res = await request(app).delete(`/artists/${id}`);
  expect(res.status).toBe(204);
})