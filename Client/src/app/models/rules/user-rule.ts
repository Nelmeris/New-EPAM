import { User } from '../user/user';
import { Rule } from './rule';
import { Identifiable } from 'src/app/interfaces/identifiable';

export class UserRule implements Identifiable {
    id: string;

    userId: string;
    ruleId: string;

    user: User;
    rule: Rule;

    firebaseFill(id: string, data: any) {
        this.id = id;
        this.userId = data.userId;
        this.ruleId = data.ruleId;
    }
}
