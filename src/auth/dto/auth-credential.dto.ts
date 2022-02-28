import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsString()
  username: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  nickname: string;
}
