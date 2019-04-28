export interface IStockInput {
    input_type: number;
    id_stock: number;
    input_date: string;
    sum_value: number;
    id_people: number;
    person: {
        name: string;
    }

}