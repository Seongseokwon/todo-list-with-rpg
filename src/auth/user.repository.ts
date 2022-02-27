import { Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import * as bcrypt from 'bcryptjs'

export class UserRepository extends Repository<User>{
  async createUser(authCredentialDto: AuthCredentialDto) : Promise<void>{
    const {email, password, username, nickname} = authCredentialDto;

    const salt = await bcrypt.genSalt();

  }
}
