import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { AuthRequest } from "../dto/AuthRequest";
import { User } from "src/user/entities/user.entity";

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
},);