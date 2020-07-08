import { UserByTypePipe } from './user-by-type.pipe';
import { User } from '../models/user/user';
import { UserType } from '../models/user/user-type';

describe('UserByTypePipe', () => {
  it('create an instance', () => {
    const pipe = new UserByTypePipe();
    expect(pipe).toBeTruthy();
  });

  it('successful returns', () => {
    const pipe = new UserByTypePipe();

    const correctUserTypeId = 'fqxcghwwcv';
    const correctCount = 3;

    const userType = new UserType();
    userType.id = correctUserTypeId;

    const users = [];

    for (let i = 0; i < correctCount; i++) {
      const user = new User();
      user.typeId = correctUserTypeId;
      users.push(user);
    }

    for (let i = 0; i < 10; i++) {
      const user = new User();
      user.typeId = '';
      users.push(user);
    }

    expect(pipe.transform(users, userType).length).toBe(correctCount);
  });
});