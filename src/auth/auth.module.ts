import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '../database.module';
import { authProviders } from './auth.providers';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy} from './jwt.strategy'

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'my-jwt-secret',
      signOptions: {
        expiresIn: 3600,
      }
     })
  ],
  controllers: [AuthController],
  providers: [...authProviders, AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
