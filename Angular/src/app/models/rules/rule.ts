import { Identifiable } from 'src/app/interfaces/identifiable';

export class Rule implements Identifiable {
    id: string;
    title: string;

    fill(data: any) {
        if (!data) return;
        this.id = data.id;
        this.title = data.title;
    }
}
