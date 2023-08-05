const request = require('supertest');
const app = require('../app');

let token;
beforeAll(async () => {
    const res = await request(app).post('/users/login')
    .send({
        email: 'test@gmail.com',
        password: 'test1234'
    });
    token = res.body.token
})

test('GET /categories', async () => {
    const res = await request(app).get('/categories');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /categories debe crear una categoría', async () => {
     const newCategory = {
         name: 'Tech'
     }
     const res = await request(app)
            .post('/categories')
            .send(newCategory)
            .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(201);   
    expect(res.body.name).toBe(newCategory.name);
    expect(res.body.id).toBeDefined();
});

test('PUT /categories/:id debe actualizar una categoría', async () => {
    const updateCategory = {
        name: 'Tech actualizado'
    }
    const res = await request(app)
            .put('/categories/1')
            .send(updateCategory)
            .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(updateCategory.name);
});

test('DELETE /categories/:id debe eliminar una categoría', async () => {
    const res = await request(app)
            .delete('/categories/1')
            .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(204);
});