import { UserRepository } from '../../core/repositories/UserRepository';
import { User } from '../../core/models/User';

export class GetUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(id: number): Promise<User> {
    return await this.userRepository.getUser(id);
  }
}
