export class OrderStatus {
    id: number;
    title: string;

    constructor(json) {
        if (!json) {
            return;
        }
        this.id = json.id;
        this.title = json.title;
    }
}
