const request = require('supertest');
const app = require('../app');
const Image = require('../models/Image');
require('../models')

let token;
let id;

beforeAll(async () => {
    const res = await request(app).post('/users/login')
    .send({
        email: 'test@gmail.com',
        password: 'test1234'
    });
    token = res.body.token
});

test('GET /products traer los productos', async () => {
    const res = await request(app).get('/products')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /products crear un producto', async () => {
    const newProduct = {
            title:"phone",
            description:"phone",
            brand:"smart",
            price: 500  
    }
    const res = await request(app).post('/products')
        .send(newProduct)
        .set('Authorization', `Bearer ${token}`);
        
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(newProduct.title);
    expect(res.body.id).toBeDefined();
});

test('PUT /products/:id actualizar un producto', async () => {
    const updateProduct = {
            title:"new phone",
    }
    const res = await request(app).put(`/products/${id}`)
        .send(updateProduct)
        .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.title).toBe(updateProduct.title);
});

test('POST /products/:id/images agregar imagen a un producto', async () => {
    const image = await Image.create({
        url: 'https://picsum.photos/200/300',
        publicId: '14'
    });

    const res = await await request(app)
        .post(`/products/${id}/images`)
        .send([image.id])
        .set('Authorization', `Bearer ${token}`);

    await image.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    // expect(res.body).toHaveLength(1);
});

test('DELETE /products/:id eliminar un producto', async () => {
    const res = await request(app).delete(`/products/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204)
});