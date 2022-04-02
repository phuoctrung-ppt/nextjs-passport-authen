import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { UserInfo } from './../../../shared/@types/UserInfo';
import { HTTP_STATUS } from './../../../utils/HttpStatus';

const SECRET_KEY = process.env.SECRET_KEY || 'the-secret-key-16-character';

export const loginController = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err, user: UserInfo) => {
    if (err) {
      return res.status(HTTP_STATUS.UN_AUTHEN).send({ message: err.message });
    }
    if (user) {
      const token = jwt.sign(user, SECRET_KEY, { expiresIn: 60 * 120 });
      // const cookie = serialize('token', token, {
      //   httpOnly: true,
      //   sameSite: 'strict',
      // });
      res.cookie('auth_demo', token, {
        httpOnly: true,
        sameSite: 'strict',
      });
      return res.redirect('/', HTTP_STATUS.REDIRECT);
    }
  })(req, res, next);
};
