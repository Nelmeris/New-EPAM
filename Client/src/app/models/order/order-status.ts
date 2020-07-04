import { Identifiable } from 'src/app/interfaces/identifiable';

export class OrderStatus implements Identifiable {
    id: string;
    title: string;

    firebaseFill(id: string, data: any) {
        this.id = id;
        this.title = data.title;
    }
}
