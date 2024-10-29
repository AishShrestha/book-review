import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        // Retrieve the required roles from the handler metadata
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;


        const hasRole = () => {
            if (!user) {
                return false;
            }


            return requiredRoles.includes(user.role);
        };


        if (!hasRole()) {
            throw new ForbiddenException('You do not have the necessary permissions');
        }

        return true;
    }
}
