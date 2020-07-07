export class Rule {
    id: string;
    title: string;

    fill(data: any) {
        if (!data) return;
        this.id = data.id;
        this.title = data.title;
    }
}
