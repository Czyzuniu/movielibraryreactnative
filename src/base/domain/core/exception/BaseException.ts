export default class BaseException extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BaseException.prototype);
  }
}
