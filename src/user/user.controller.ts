import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('all')
  @UseGuards(AuthGuard)
  findAll(@Req() req: any) {
    return this.userService.findAll();
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey('profile')
  @CacheTTL(10)
  @Get('profile')
  @UseGuards(AuthGuard)
  profile(@Req() req: any) {
    return this.userService.profile(req.user.id);
  }

}
