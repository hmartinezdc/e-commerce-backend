const sequelize = require('../utils/connection');
require('../models')
//Para pasar los tokens a los test
const request = require('supertest');
const app = require('../app');

const main = async() => {
    try{
        await sequelize.sync({ force: true });
        sequelize.sync()

        const user = {
            firstName: "test",
            lastName: "testUser",
            email: "test@gmail.com",
            password: "test1234",
            phone: "987654321",
        }
        await request(app).post('/users').send(user);

        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();