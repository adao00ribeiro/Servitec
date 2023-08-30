import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequest } from './dto/AuthRequest';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IsPublic } from './decorators/is-public.decorator';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @IsPublic()
    // @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Request() req: AuthRequest) {
        // return await this.authService.Login(req.user);

    }
}
