describe('Products functional tests', () => {
    describe('When creating a porduct', () => {
        it('Should create a product with success', async () => {
            const product = {
                name: "Garlic",
                price: 10.22,
                quantity: 8
            };
            const response = await (await global.testRequest.post('/products').send(product));
            expect(response.status).toBe(201);
            expect(response.body).toEqual(expect.objectContaining(product));
        });
    });
});