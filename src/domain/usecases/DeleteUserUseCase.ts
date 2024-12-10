import { User } from '../../core/models/User';
import { UserRepository } from '../../core/repositories/UserRepository';

export class DeleteUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(id: number): Promise<void> {
    return await this.userRepository.deleteUser(id);
  }
}