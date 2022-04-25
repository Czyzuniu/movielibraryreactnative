import BaseException from './BaseException';

export default class NoRecordException extends BaseException {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NoRecordException.prototype);
  }
}
