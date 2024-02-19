import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private authService: AuthService,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    @Post('signup')
    async register( @Body() createUserDto: CreateUserDto ) {
        // this.eventEmitter.emit('user.welcome', createUserDto);
        return await this.userService.create(createUserDto);
    }

    @Post('login')
    async login( @Body() createUserDto: CreateUserDto ) {
        return await this.authService.login(createUserDto);
    }

}
