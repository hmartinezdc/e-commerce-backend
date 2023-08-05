const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');
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
})


test('GET /carts traer todos los productos del cart', async () => {
    const res = await request(app).get('/cart').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
});

test('POST /cart agregar un producto al carrito', async () => {
    const product = await Product.create({
            title:"phone",
            description:"phone",
            brand:"smart",
            price: 500  
    })
    const newCart = {
        quantity: 1,
        productId: product.id
    }
    const res = await request(app)
        .post('/cart')
        .send(newCart)
        .set('Authorization', `Bearer ${token}`)

    id = res.body.id
    await product.destroy()

    expect(res.status).toBe(201)
    expect(res.body.quantity).toBe(newCart.quantity)
    expect(res.body.id).toBeDefined()
});

test('PUT /cart/:id modificar un producto del carrito ', async () => {
    const updateCart = {
        quantity: 1,
    }
    const res = await request(app)
        .put(`/cart/${id}`)
        .send(updateCart)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.quantity).toBe(updateCart.quantity)
});

test('DELETE /cart/:id eliminar un producto del carrito ', async () => {
    const res = await request(app)
        .delete(`/cart/${id}`)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
});