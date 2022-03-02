import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async getAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  async signup(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ message: string }> {
    return this.userRepository.createUser(authCredentialDto);
  }

  async signin(userDto: UserDto): Promise<{ accessToken: string }> {
    const { email, password } = userDto;
    const user = await this.userRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('UnAuthorized User');
    }
  }
}
