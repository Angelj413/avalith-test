import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   *  Find all users
   * @returns {Promise<User[]>}
   */
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  /**
   * Find one user by id
   * @param id : number
   * @returns {Promise<User>}
   */
  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  /**
   * Find one user by username
   * @param username : string
   * @returns {Promise<User>}
   */
  async findByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { username } });
  }

  /**
   * Create a new user
   * @param data : CreateUserDto
   * @returns {Promise<User>}
   */
  async create(data: CreateUserDto): Promise<User> {
    const hashPassword = await hash(data.password, 10);
    data.password = hashPassword;
    const newUser = this.usersRepository.create(data);
    return await this.usersRepository.save(newUser);
  }

  /**
   * Update a user
   * @param id : number
   * @param changes : UpdateUserDto
   * @returns {Promise<User>}
   */
  async update(id: number, changes: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    this.usersRepository.merge(user, changes);
    return await this.usersRepository.save(user);
  }
}
