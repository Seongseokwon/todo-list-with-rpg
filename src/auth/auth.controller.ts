import { Body, Controller, Post } from "@nestjs/common";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { AuthService } from "./auth.service";

@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {
  }
  @Post('signUp')
  signUp(
    @Body() authCredentialDto: AuthCredentialDto
  ): Promise<void>{
    return this.authService.signup(authCredentialDto)
  }

}
