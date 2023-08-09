import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { hash } from 'bcrypt';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import configuration from 'src/config/configuration';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService<typeof configuration>,
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
    if (changes.password) {
      const hashPassword = await hash(changes.password, 10);
      changes.password = hashPassword;
    }

    if (changes.username) {
      const user = await this.usersRepository.findOne({
        where: { username: changes.username },
      });
      if (user) {
        throw new BadRequestException('Username already exists');
      }
    }

    if (changes.phone) {
      const phoneValidation = await axios({
        method: 'get',
        url: 'http://apilayer.net/api/validate',
        params: {
          access_key: this.configService.get('numVerifyApiKey'),
          number: changes.phone,
        },
      });

      if (!phoneValidation.data.valid) {
        throw new BadRequestException('Invalid phone number');
      }
    }

    const user = await this.usersRepository.findOne({ where: { id } });
    this.usersRepository.merge(user, changes);
    return await this.usersRepository.save(user);
  }
}
