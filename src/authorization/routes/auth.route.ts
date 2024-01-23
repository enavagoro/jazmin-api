import { Router } from 'express';
import { login } from '../controllers/auth.controller';

class AuthorizationRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes(): void {
        this.router.post('/', login);
    }
}

const authorizationRoutes = new AuthorizationRoutes();
export default authorizationRoutes.router;