const request = require('supertest');
const {expect} = require('chai');
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao');
const postTransferenciasPayload = require('../fixtures/postTransferencias.json');

describe('Transferencias', () => {
    let token;

    beforeEach(async () => {
        token = await obterToken('julio.lima', '123456');
    })

    describe('POST /transferencias', () => {
        it('Deve retornar sucesso com 201 quando o valor da transferencia for igual ou acima de 10 reais', async () => {
            const bodyTransferencias = { ...postTransferenciasPayload };
            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias);
            expect(response.status).to.equal(201);
            expect(response.body).to.be.an('object');
            console.log(' ');
            console.log('---------------Response---------------');
            console.log('Status Code:', response.status);
            console.log('Response Body:', response.body);
        });

        it('Deve retornar falha com 422 quando o valor da transferencia for abaixo de 10 reais', async () => {
            const bodyTransferencias = { ...postTransferenciasPayload };
            bodyTransferencias.valor = 8;

            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias);
            expect(response.status).to.equal(422);
            expect(response.body).to.be.an('object');
            console.log(' ');
            console.log('---------------Response---------------');
            console.log('Status Code:', response.status);
            console.log('Response Body:', response.body);
        });
    });

    describe('GET /transferencias/{id}', () => {
        it('Deve retornar sucesso com 200 e dados iguais ao registro de transferencia contido no banco de dados quando o ID for válido', async () => {
            const response = await request(process.env.BASE_URL)
                .get('/transferencias/1')
                .set('Authorization', `Bearer ${token}`)
            
            console.log(' ');
            console.log('---------------Response---------------');
            console.log('Status Code:', response.status);
            console.log('Response Body:', response.body);

            expect(response.status).to.equal(200);
            expect(response.body.id).to.equal(1);
            expect(response.body.id).to.be.a('number');
            expect(response.body.conta_origem_id).to.equal(1);
            expect(response.body.conta_destino_id).to.equal(2);
            expect(response.body.valor).to.equal(11);
        });
    });

    describe('GET /transferencias', () => {
        it('Deve retornar 10 elementos na paginação quando informar limite de 10 registros', async () => {
            const response = await request(process.env.BASE_URL)
                .get('/transferencias?page=1&limit=10')
                .set('Authorization', `Bearer ${token}`)
            
            console.log(' ');
            console.log('---------------Response---------------');
            console.log('Status Code:', response.status);
            console.log('Response Body:', response.body);

            expect(response.status).to.equal(200);
            expect(response.body.page).to.equal(1);
            expect(response.body.limit).to.equal(10);
            expect(response.body.transferencias).to.have.lengthOf(10);
        });
    });

});