import { Router } from 'express';
import { loginController } from '../controllers/auth/loginController';
import { registerController } from '../controllers/auth/registerController';
import { validateEmail } from '../middlewares/validator/exitingEmail';

const authRouter = Router();

authRouter.post('/register', validateEmail, registerController);

authRouter.post('/login', loginController);

export default authRouter;
