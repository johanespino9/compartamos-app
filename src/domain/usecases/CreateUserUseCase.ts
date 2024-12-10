import { UserRepository } from '../../core/repositories/UserRepository';
import { User } from '../../core/models/User';

export class CreateUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(user: User): Promise<void> {
    return await this.userRepository.createUser(user);
  }
}
