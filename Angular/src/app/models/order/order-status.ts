export class OrderStatus {
    id: string;
    title: string;

    fill(data: any) {
        this.id = data.id;
        this.title = data.title;
    }
}
