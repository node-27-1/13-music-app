const request = require('supertest');
const app = require('../app');
const Genre = require('../models/Genre');
require('../models');

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


// 1. Crear un género
// 2. Ejecutar el endpoint, pasándole el id del género creado
// 3. Eliminar el género
// 4. Expect del status y uno del largo del body
test('POST /artists/:id/genres debe insertar los géneros de un artista', async () => {
  const genre = await Genre.create({ name: "pop" });
  const res = await request(app)
    .post(`/artists/${id}/genres`)
    .send([genre.id]);
  await genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});


test('DELETE /artists/:id debe eliminar un artista', async () => {
  const res = await request(app).delete(`/artists/${id}`);
  expect(res.status).toBe(204);
})
