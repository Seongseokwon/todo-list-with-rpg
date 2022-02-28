import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signup(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ message: string }> {
    return this.userRepository.createUser(authCredentialDto);
  }

  async getAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }
}
