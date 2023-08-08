import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOneBy({ id });
  }

  async create(data: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(data);
    return await this.usersRepository.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    this.usersRepository.merge(user, changes);
    return await this.usersRepository.save(user);
  }
}
