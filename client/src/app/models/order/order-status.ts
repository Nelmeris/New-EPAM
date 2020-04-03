export class OrderStatus {
    id: number;
    title: string;

    constructor(json) {
        this.id = json.id;
        this.title = json.title;
    }
}
