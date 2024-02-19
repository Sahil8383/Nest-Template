import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async login({ email,password }: any ) {
        const user = await this.userService.findByEmail(email);
        if(!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { 
            id: user.id,
            username: user.name,
            email: user.email,
        };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

}
