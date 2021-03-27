import { Product } from "@src/models/products";

describe('Products functional tests', () => {
	beforeEach(async () => {
    await Product.deleteMany({});
    const defaulProduct = {
      name: "Garlic",
			price: 10.22,
			quantity: 0
    };
    const product = new Product(defaulProduct);
    await product.save();
  });
	describe('When find a product', () => {
		it('Should find a product with success', async () => {
			const product = {
				name: "Garlic",
				price: 10.22,
				quantity: 0
			};
			const response = await global.testRequest.get('/products/Garlic');
			expect(response.status).toBe(200);
			expect(response.body).toEqual(expect.objectContaining(product));
		});

		it('Should return 404 when not found a product', async () => {
			const response = await global.testRequest.get('/products/Garlic2');
			expect(response.status).toBe(404);
			expect(response.body).toEqual({
					code: 404,
					error: 'Product not found!'
			});
		});
	});
});