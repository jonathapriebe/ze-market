import supertest from 'supertest';

describe('Order functional tests', () => {
    it('should be list orders', async() => {
        const { body, status } = await supertest(app).get('/orders');
        expect(status).toBe(200);
        expect(body).toBe({
            "products": [
              {
                "name": "Kiwi",
                "quantity": 1
              }
            ]
          });
    });
});