import { Identifiable } from 'src/app/interfaces/identifiable';

export class UserType implements Identifiable {
    id: string;
    title: string;

    fill(data: any) {
        this.id = data.id;
        this.title = data.title;
    }
}
