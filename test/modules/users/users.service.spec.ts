import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../../src/modules/users/users.service';
import { User } from '../../../src/modules/users/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from '../../../src/modules/users/dto/users.dto';
import { ConfigService } from '@nestjs/config';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;
  let config: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(
              () =>
                new Promise((resolve) =>
                  resolve([
                    {
                      id: 1,
                      username: 'testuser',
                      password: 'testpassword',
                    },
                  ]),
                ),
            ),
            findOne: jest.fn((id: number) => {
              return {
                id,
                username: 'testuser',
                password: 'testpassword',
              };
            }),
            create: jest.fn(() => {
              return {
                ...new User(),
              };
            }),
            update: jest.fn((id: number, user: User) => {
              return {
                id,
                ...user,
              };
            }),
            save: jest.fn((user: User) => {
              return {
                ...user,
              };
            }),
            merge: jest.fn((user: User, changes: User) => {
              return {
                ...user,
                ...changes,
              };
            }),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    config = module.get<ConfigService>(ConfigService);
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
      const user: User = new User();
      jest.spyOn(repo, 'findOne').mockResolvedValue(user);
      expect(await service.findOne(1)).toEqual(user);
    });
  });

  describe('findByUsername', () => {
    it('should get a single user', async () => {
      const user: User = new User();
      jest.spyOn(repo, 'findOne').mockResolvedValue(user);
      expect(await service.findByUsername('testuser')).toEqual(user);
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testUser',
        password: 'plainPassword',
      };
      const user: User = createUserDto as User;
      jest.spyOn(repo, 'create').mockReturnValue(user);
      jest.spyOn(repo, 'save').mockResolvedValue(user);
      expect(await service.create(user)).toBe(user);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const user: User = {
        id: 1,
        username: 'testUser',
        password: 'plainPassword',
      } as User;
      const changes: User = new User();
      changes.username = 'testUser2';
      jest.spyOn(repo, 'findOne').mockResolvedValue(user);
      jest.spyOn(repo, 'merge').mockReturnValue(user);
      jest.spyOn(repo, 'save').mockResolvedValue(user);
      expect(await service.update(1, changes)).toBe(user);
    });
  });
});
