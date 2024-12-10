import { UserRepository } from '../../core/repositories/UserRepository';
import { User } from '../../core/models/User';

export class GetUsersUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(): Promise<User[]> {
    return await this.userRepository.getUsers();
  }
}
