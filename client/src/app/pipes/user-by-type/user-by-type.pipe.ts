import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../models/user/user';
import { UserType } from '../../models/user/user-type';

@Pipe({
  name: 'userByType'
})
export class UserByTypePipe implements PipeTransform {

  transform(users: User[], type: UserType): User[] {
    return users.filter(user => user.typeId === type.id);
  }

}
