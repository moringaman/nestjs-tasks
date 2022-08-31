import { Injectable, Inject, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface'

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt()
    const user = new User();
    user.username = username;
    user.password = await this.hashPassword(password, salt);
    user.salt = salt;


    try {
      await user.save();
    } catch (error) {
        console.log(error.code)
        if(error.code === '23505') {
            throw new ConflictException('Username already exists')
        } else {
            throw new InternalServerErrorException()
        }
    }
  }

  async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string} | string> {
    const { username, password } = authCredentialsDto
    const user = await this.userRepository.findOne({where: {username: username}})
    console.log(password)
    if(!password) return "Please provide a password"
    const isValid = await user.validatePassword(password)

    if (user && isValid) {
        const payload:JwtPayload = { username }
        const accessToken = await this.jwtService.sign(payload)
        return { accessToken }
    }
    return 'Invalid username or password'
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt)
  }
}

