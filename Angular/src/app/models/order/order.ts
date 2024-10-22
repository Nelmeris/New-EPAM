import { OrderType } from './order-type';
import { OrderStatus } from './order-status';
import { User } from '../user/user';

export class Order {
    id: string;

    userId: string;
    typeId: string;
    description: string;
    statusId: string;
    managerId: string;

    type: OrderType;
    status: OrderStatus;
    userOwner: User;
    manager: User;

    fill(data: any) {
        if (!data) return;
        this.id = data.id;
        this.userId = data.userId;
        this.typeId = data.typeId;
        this.description = data.description;
        this.statusId = data.statusId;
        this.managerId = data.managerId;
    }
}
