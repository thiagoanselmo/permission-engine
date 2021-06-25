/**
 * @description Class custom error
 * @class
 */
export default class ErrorPermissionEngine extends Error {
  constructor(message = "", ...args) {
    super(message, ...args);
    this.message = message;
  }
}