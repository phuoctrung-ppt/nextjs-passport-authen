import crypto from 'crypto';
import { UserRegister } from '../../../shared/@types/UserInfo';

export const passwordValidator = (user: UserRegister, password: string) => {
  const inputHashing = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
  const isMatching = user.hash === inputHashing;
  return isMatching;
};
