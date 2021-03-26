export interface Product {
    name: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    products: Product[];
    total: number;
}

export interface OrdersResponse {
    orders: Order[];
}

export class Orders {
    public async list(): Promise<OrdersResponse> {
        return {
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
            }
            ]
        };
    }
}