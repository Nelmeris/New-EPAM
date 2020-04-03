import { OrderType } from './order-type';
import { OrderStatus } from './order-status';
import { User } from '../user/user';

export class Order {
    id: number;
    userId: number;
    orderTypeId: number;
    description: string;
    orderStatusId: number;
    managerId: number;

    type: OrderType;
    status: OrderStatus;
    userOwner: User;
    manager: User;

    constructor(json) {
        if (!json) {
            return;
        }
        this.id = json.id;
        this.userId = json.user_id;
        this.orderTypeId = json.order_type_id;
        this.description = json.description;
        this.orderStatusId = json.order_status_id;
        this.managerId = json.manager_id;
    }

    public toJSON() {
        return JSON.stringify({
            id: this.id,
            user_id: this.userId,
            order_type_id: this.orderTypeId,
            description: this.description,
            order_status_id: this.orderStatusId,
            manager_id: this.managerId
        });
    }
}
