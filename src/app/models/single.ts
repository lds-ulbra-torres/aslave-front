export class Single{
    id_stock: number;
    id_product: number;
    id_user: number;
    unit_price_output: number;
    amount_output: number;
    unit_measurement: number;
    description: string;
    createdAt: string;
    stock_products: [
            {
                id_product: number;
                name_product: string;
                unit_price: number;
                amount: number;
                id_group: number;
                stock_input_product: {
                    id_product: number;
                    id_stock: number;
                    unit_price_input: number;
                    amount_input: number
                },
                stock_product_group: {
                    id_group: number;
                    name_group: string
                }
            }
        ];
        unit_meansure: { //30 minutos de debug pra descobrir que os caras escreveram measure errado no banco
            id_unit_meansure: number;
            name: string
        };
        user: {
            id_user: number;
            full_name: string
        }
}