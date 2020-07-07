import { OrderType } from './order-type';
import { OrderStatus } from './order-status';
import { User } from '../user/user';
import { Identifiable } from 'src/app/interfaces/identifiable';

export class Order implements Identifiable {
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
        this.id = data.id;
        this.userId = data.userId;
        this.typeId = data.typeId;
        this.description = data.description;
        this.statusId = data.statusId;
        this.managerId = data.managerId;
    }
}
