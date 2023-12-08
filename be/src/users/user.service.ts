import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  create(user: User) {
    this.users.push(user);
  }

  findAll(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.users);
      }, 5000);
    });
  }

  find(user: User): Promise<User[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          this.users.filter((el: User) => {
            if (el.email.indexOf(user.email) > -1 && isNaN(user.number)) {
              return el;
            } else if (
              el.email.indexOf(user.email) > -1 &&
              el.number.toString().indexOf(user.number.toString()) > -1
            ) {
              return el;
            }
          }),
        );
      }, 5000);
    });
  }
}
