import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('users')
  getAllUser(): Promise<User[]> {
    return this.authService.getAllUser();
  }

  @Post('signUp')
  signUp(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<{ message: string }> {
    return this.authService.signup(authCredentialDto);
  }
}
