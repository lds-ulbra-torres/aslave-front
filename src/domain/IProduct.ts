export interface IProdutc {
    id_product:number;
    name_product:string;
    unit_price:number;
    amount:number;
    id_group:number;
    stock_product_group:{
        name:string;
        id_group:number;
    }
}