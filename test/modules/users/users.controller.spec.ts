import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../../src/modules/users/users.controller';
import { UsersService } from '../../../src/modules/users/users.service';

const date = new Date();
describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const usersServiceProvider = {
      provide: UsersService,
      useFactory: () => ({
        findAll: jest.fn(() => [
          {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            username: 'john.doe',
            password: 'test123',
            ssn: '123456789',
            date_of_birth: date,
            phone: '1234567890',
            created_at: date,
            updated_at: date,
          },
        ]),
        findOne: jest.fn((id: number) => ({
          id: id,
          first_name: 'John',
          last_name: 'Doe',
          username: 'john.doe',
          password: 'test123',
          ssn: '123456789',
          date_of_birth: date,
          phone: '1234567890',
          created_at: date,
          updated_at: date,
        })),
        create: jest.fn((user: any) => user),
        update: jest.fn((id: number, user: any) => user),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [usersServiceProvider],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should get all users', async () => {
    expect(await controller.findAll()).toEqual([
      {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        username: 'john.doe',
        password: 'test123',
        ssn: '123456789',
        date_of_birth: date,
        phone: '1234567890',
        created_at: date,
        updated_at: date,
      },
    ]);
  });

  it('should get a single user', async () => {
    expect(await controller.findOne(1)).toEqual({
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      username: 'john.doe',
      password: 'test123',
      ssn: '123456789',
      date_of_birth: date,
      phone: '1234567890',
      created_at: date,
      updated_at: date,
    });
  });

  it('should create a user', async () => {
    const user = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      username: 'john.doe',
      password: 'test123',
      ssn: '123456789',
      date_of_birth: date,
      phone: '1234567890',
      created_at: date,
      updated_at: date,
    };
    expect(await controller.create(user)).toEqual(user);
  });

  it('should update a user', async () => {
    const user = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      username: 'john.doe',
      password: 'test123',
      ssn: '123456789',
      date_of_birth: date,
      phone: '1234567890',
      created_at: date,
      updated_at: date,
    };
    expect(await controller.update(1, user)).toEqual(user);
  });
});
