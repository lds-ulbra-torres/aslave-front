export class Financial_releases{
    id_financial_release: number;
    id_people: number;
    id_classification: number;
    type_mov: string;
    num_doc: number;
    date_financial_release: string;
    value: number;
    due_date_pay: string;
    historic: string;
    createdAt: string;
    person: {
        name: string;
    }
}