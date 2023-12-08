import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user';
import { UserService } from './user.service';
import { User } from './interfaces/user';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {
    const data = [
      {
        email: 'jim@gmail.com',
        number: 221122,
      },
      {
        email: 'jam@gmail.com',
        number: 830347,
      },
      {
        email: 'john@gmail.com',
        number: 221122,
      },
      {
        email: 'jams@gmail.com',
        number: 349425,
      },
      {
        email: 'jams@gmail.com',
        number: 141424,
      },
      {
        email: 'jill@gmail.com',
        number: 822287,
      },
      {
        email: 'jill@gmail.com',
        number: 822286,
      },
    ];

    for (let i = 0; i < data.length; i++) {
      this.userService.create(data[i]);
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    this.userService.create(createUserDto);
  }

  @Get('/find-all')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('/find')
  async findUser(@Body() data: User): Promise<User[]> {
    console.log('number', Number(data.number));
    return this.userService.find({
      email: data.email,
      number: Number(data.number),
    });
  }
}
