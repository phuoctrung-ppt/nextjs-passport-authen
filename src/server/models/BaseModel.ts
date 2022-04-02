export class BaseModel {
  statusCode: number;
  message: string;
  result: any;
  constructor(statusCode: number, message: string, result: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.result = result;
  }
}
