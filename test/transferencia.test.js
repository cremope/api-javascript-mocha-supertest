const request = require('supertest');
const {expect} = require('chai');
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao');

describe('Transferencias', () => {
    describe('POST /transferencias', () => {
        let token;
        
        beforeEach(async () => {
            token = await obterToken('julio.lima', '123456');
        })

        it('Deve retornar sucesso com 201 quando o valor da transferencia for igual ou acima de 10 reais', async () => {
            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                        contaOrigem: 1,
                        contaDestino: 2,
                        valor: 11,
                        token: ''
                    });
            expect(response.status).to.equal(201);
            expect(response.body).to.be.an('object');
            console.log(' ');
            console.log('---------------Response---------------');
            console.log('Status Code:', response.status);
            console.log('Response Body:', response.body);
        });

        it('Deve retornar falha com 422 quando o valor da transferencia for abaixo de 10 reais', async () => {
            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                        contaOrigem: 1,
                        contaDestino: 2,
                        valor: 8,
                        token: ""
                    });
            expect(response.status).to.equal(422);
            expect(response.body).to.be.an('object');
            console.log(' ');
            console.log('---------------Response---------------');
            console.log('Status Code:', response.status);
            console.log('Response Body:', response.body);
        });
    });
});