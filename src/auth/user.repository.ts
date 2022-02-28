import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ message: string }> {
    const { email, password, username, nickname } = authCredentialDto;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      email,
      password: hashPassword,
      username,
      nickname,
    });
    console.log(user);

    try {
      await this.save(user);
      return { message: 'success' };
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        if (error.detail.includes('email')) {
          throw new ConflictException('Existing email');
        } else if (error.detail.includes('nickname')) {
          throw new ConflictException('Existing nickname');
        }
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
