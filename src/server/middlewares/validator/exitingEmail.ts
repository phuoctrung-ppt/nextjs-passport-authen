import { NextFunction, Request, Response } from 'express';
import { UserRegister } from '../../../shared/@types/UserInfo';
import { HTTP_STATUS } from '../../../utils/HttpStatus';
import { readFileStream } from '../../../utils/readCSV';

export const validateEmail = async (
  req: Request<unknown, unknown, UserRegister>,
  res: Response,
  next: NextFunction
) => {
  const { username, email } = req.body;
  if (!username) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Username must required' }).end();
  }
  if (!email) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Email must required' }).end();
  }
  
  const users: any = await readFileStream('file.csv');
  const existingUser = await users.filter((user: UserRegister) => user.username === username);
  if (existingUser.length) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Username already exist!' }).end();
  }
  const existingEmail = await users.filter((user: UserRegister) => user.email === email);
  if (existingEmail.length) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Email already exist!' }).end();
  }
  next();
};
