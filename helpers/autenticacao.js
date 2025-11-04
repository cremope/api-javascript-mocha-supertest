const request = require('supertest');
const postLoginPayload = require('../fixtures/postLogin.json');

const obterToken = async (usuario, senha) =>{
    const bodyLogin = { ...postLoginPayload };
    const response_Login = await request(process.env.BASE_URL)
                    .post('/login')
                    .set('Content-Type', 'application/json')
                    .send(bodyLogin);
                
    return response_Login.body.token;
}

module.exports = {
    obterToken
}