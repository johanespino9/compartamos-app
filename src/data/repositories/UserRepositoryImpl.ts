import { UserRepository } from '../../core/repositories/UserRepository';
import { User } from '../../core/models/User';
import { UserDataSource } from '../datasources/UserDataSource';

export class UserRepositoryImpl implements UserRepository {
  async getUsers(): Promise<User[]> {
    return await UserDataSource.getUsers();
  }

  async getUser(id: number): Promise<User> {
    return await UserDataSource.getUser(id);
  }

  async createUser(user: User): Promise<void> {
    await UserDataSource.createUser(user);
  }

  async updateUser(id: number, user: User): Promise<void> {
    await UserDataSource.updateUser(id, user);
  }

  async deleteUser(id: number): Promise<void> {
    await UserDataSource.deleteUser(id);
  }
}
