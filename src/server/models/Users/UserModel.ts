import { BaseModel } from '../BaseModel';

export class UserModel extends BaseModel {
  constructor(statusCode: number, message: string, result: any) {
    super(statusCode, message, result);
    this.result = result;
  }
}
