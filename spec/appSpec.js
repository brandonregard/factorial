/**
 * Test REST API Application to compute factorials
 */
const request = require('supertest');

describe('Factorial API', () => {

    beforeEach(() => app = require('../app'));

    afterEach(() => app.close());

    describe('random endpoint', () => {
        it('returns a JSON payload with input/output properties', (done) => {
            request(app)
                .get('/factorial/random')
                .expect(200)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect((res) => {
                    if(!res.body.hasOwnProperty('input')) {
                        throw new Error('Missing input property');
                    }
                })
                .expect((res) => {
                    if(!res.body.hasOwnProperty('output')) {
                        throw new Error('Missing output property');
                    }
                })
                .end((error) => (error) ? done.fail(error) : done());
        });
    });

    describe(':n endpoint', () => {
        it('returns a JSON payload with input = 5, output = 120', (done) => {
            request(app)
                .get('/factorial/5')
                .expect(200)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect((res) => {

                    if(!res.body.hasOwnProperty('input')) {
                        throw new Error('Missing input property');
                    }
                })
                .expect((res) => {

                    if(!res.body.hasOwnProperty('output')) {
                        throw new Error('Missing output property');
                    }
                })
                .expect((res) => {

                    if(res.body.input !== '5') {
                        throw new Error('Incorrect input value');
                    }
                })
                .expect((res) => {

                    if(res.body.output !== '120') {
                        throw new Error('Incorrect output value');
                    }
                })
                .end((error) => (error) ? done.fail(error) : done());
        });
    });
});