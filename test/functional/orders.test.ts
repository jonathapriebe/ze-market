describe('Order functional tests', () => {
  it('Should be list orders', async () => {
    const { body, status } = await global.testRequest.get('/orders');
    expect(status).toBe(200);
    expect(body).toEqual({
      orders: [
        {
          id: '123',
          products: [
            {
              name: 'Watermelon',
              quantity: 2,
              price: 5.47,
            },
          ],
          total: 10.94,
        },
      ],
    });
  });
});
