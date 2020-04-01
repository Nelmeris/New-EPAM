export class Order {
    id: number;
    userId: number;
    orderTypeId: number;
    description: string;
    orderStatusId: number;

    constructor(json) {
        this.id = json.id;
        this.userId = json.user_id;
        this.orderTypeId = json.order_type_id;
        this.description = json.description;
        this.orderStatusId = json.order_status_id;
    }
}
