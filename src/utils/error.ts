import {ErrorCode} from '../types/error';

export default class ProviderError extends Error {
  constructor(private code: ErrorCode, public message: string) {
    super(message);
  }

  toString() {
    return `${this.code} (${this.message})`;
  }
}
