import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { Repository } from "typeorm";
import { User } from './user.entity';
import { JwtPayload } from './jwt-payload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(

    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'my-jwt-secret'
        })
    }

    async validate(payload: JwtPayload) {
        const { username } = payload
        const user = await this.userRepository.findOne({ where: { username: username}})

        if(!user) {
            throw new UnauthorizedException()
        }

        return user
    }
}