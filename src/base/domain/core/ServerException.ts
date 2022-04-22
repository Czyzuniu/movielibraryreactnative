import BaseException from './BaseException';

export default class ServerException extends BaseException {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ServerException.prototype);
  }
}
