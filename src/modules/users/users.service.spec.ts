import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [];
      jest.spyOn(repo, 'find').mockResolvedValue(users);
      expect(await service.findAll()).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should get a single user', async () => {
      const user: User = {
        id: 1,
        username: 'testuser',
        password: 'test123',
        first_name: 'Test',
        last_name: 'User',
        ssn: '123456789',
        date_of_birth: new Date(),
        phone: '1234567890',
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest.spyOn(repo, 'findOne').mockResolvedValue(user);
      expect(await service.findOne(1)).toEqual(user);
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const user: User = {
        id: 1,
        username: 'testuser',
        password: 'test123',
        first_name: 'Test',
        last_name: 'User',
        ssn: '123456789',
        date_of_birth: new Date(),
        phone: '1234567890',
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest.spyOn(repo, 'create').mockReturnValue(user);
      jest.spyOn(repo, 'save').mockResolvedValue(user);
      expect(await service.create(user)).toEqual(user);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const user: User = {
        id: 1,
        username: 'testuser',
        password: 'test123',
        first_name: 'Test',
        last_name: 'Updated',
        ssn: '123456789',
        date_of_birth: new Date(),
        phone: '1234567890',
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest.spyOn(repo, 'findOne').mockResolvedValue(user);
      jest.spyOn(repo, 'merge').mockReturnValue(user);
      jest.spyOn(repo, 'save').mockResolvedValue(user);
      expect(await service.update(1, user)).toEqual(user);
    });
  });
});
