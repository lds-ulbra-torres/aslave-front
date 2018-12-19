export interface IStockInput {
    id_people:number;
    id_stock:number;
    input_date:string;
    input_type:number;
    person: {
        name:string;
    }
    sum_value:number;
}