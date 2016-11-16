import { IProviderConfigs, IRequest, IResponse, TProviderIds, IProviderConfig, config } from '../common';
import { loginHook } from '../../lib/common';
import { applyClientIds } from '../common';
import * as clientIds from '../client-ids';

export function init() {
  applyClientIds(clientIds.configLocal);
  loginHook.doLogin = rootHook => { };
  loginHook.isLogged = () => true;
}

export function callLogin() {
}
