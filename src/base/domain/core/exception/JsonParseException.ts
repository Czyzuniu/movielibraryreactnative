import BaseException from './BaseException';

export default class JsonParseException extends BaseException {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, JsonParseException.prototype);
  }
}
