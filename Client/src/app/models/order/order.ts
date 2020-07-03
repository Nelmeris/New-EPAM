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
}
