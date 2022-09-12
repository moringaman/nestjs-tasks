import { Controller, Post, Body, ValidationPipe, UseGuards, Req, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { GetUser } from './get-user.decorator'
import { User } from './user.entity'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/')
  welcome() {
    return 'welcome to the tasks api'
  }

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signin(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{accessToken: string} | string> {
    return this.authService.validateUserPassword(authCredentialsDto);
  }

  @Post('/test')
    @UseGuards(AuthGuard()) 
    
    test(@GetUser() user: User) {
        console.log(user)
    }
}
