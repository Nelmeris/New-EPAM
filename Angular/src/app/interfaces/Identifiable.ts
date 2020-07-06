export abstract class Identifiable {
    id: string;
    constructor(id: string, ...data: any) {
        this.id = id;
    };
}