export class UserType {
    id: string;
    title: string;

    fill(data: any) {
        this.id = data.id;
        this.title = data.title;
    }
}
