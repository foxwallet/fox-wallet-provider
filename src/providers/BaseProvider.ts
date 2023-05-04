import {EventEmitter} from 'events';
import {Chain} from '../types';
import Logger from '../utils/logger';
import {ProviderOptions} from '../types/provider';

export default class BaseProvider extends EventEmitter {
  protected debug = false;
  protected chain;
  protected callbacks: Map<number, (error: Error | null, data: any) => void> =
    new Map();
  protected logger: Logger;
  public readonly isFoxWallet = true;

  constructor(options: ProviderOptions) {
    super();
    this.debug = options.debug ?? false;
    this.chain = options.chain;
    this.logger = options.logger;
  }

  protected postMessage(handler: string, id: number, data: string) {
    let object = {
      id: id,
      name: handler,
      object: data,
      chain: this.chain,
    };
    if (window.foxwallet.postMessage) {
      window.foxwallet.postMessage(object);
    } else {
      this.logger.error('postMessage is not available', window.foxwallet);
    }
  }

  sendResponse(id: number, result: any) {
    let callback = this.callbacks.get(id);
    if (this.debug) {
      this.logger.debug(
        `sendResponse id: ${id}, result: ${JSON.stringify(result)}`
      );
    }
    if (callback) {
      callback(null, result);
      this.callbacks.delete(id);
    } else {
      this.logger.error(`sendResponse callback id: ${id} not found`);
    }
  }

  sendError(id: number, error: Error | string) {
    this.logger.info(`${id} sendError ${error}`);
    let callback = this.callbacks.get(id);
    if (callback) {
      callback(error instanceof Error ? error : new Error(error), null);
      this.callbacks.delete(id);
    } else {
      this.logger.error(`sendError callback id: ${id} not found`);
    }
  }
}
