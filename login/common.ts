import { Exception, IRouteNodeCommon } from '../lib/common';

export type TProviderIds = 'google' | 'facebook' | 'msoft';

export interface IProviderConfig {
  client_id?: string; //klic pro kumunikaci se serverem providera
  authorizationUrl?: string; //autorizacni URL providera
  profileUrl?: string; //url providera pro ziskani profile informaci
  scopes?: string; //identifikace udaju z profilu (email, ...) providera
  parseProfile?: (obj: any) => IResponse; //funkce na parsování providerem poskytnutého profilu
}

export interface IProviderConfigs {
  loginRoute: IRouteNodeCommon;
  google: IProviderConfig;
  facebook: IProviderConfig;
  msoft: IProviderConfig;
}

export interface IRequest {
  providerId: TProviderIds;
  client_id: string; //string, povolujici konkretni alikaci se prihlasit u providera
  returnUrl: IRouteNodeCommon; //return url for successfull login
}

export interface IResponse {
  providerId: TProviderIds; 
  email:string; //uzivateluv email
  id: string; //id uzivatele u providera
  firstName?: string; 
  lastName?: string;
}

export interface IClientIdsConfig {
  google: string;
  facebook: string;
  msoft: string;
}

//see D:\LMCom\rew\TheWeb\wwwroot\Common\lib\oauth.ts
export let config: IProviderConfigs = {
  loginRoute: {
    handlerId:''
  },
  facebook: {
    authorizationUrl: 'https://www.facebook.com/dialog/oauth',
    profileUrl: 'https://graph.facebook.com/me',
    scopes: 'email',
    parseProfile: obj => {
      var res: IResponse = { id: obj.id, email: obj.email, firstName: obj.first_name, lastName: obj.last_name ? obj.last_name : obj.name, providerId: 'facebook' };
      return res;
    }
  },
  google: {
    authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
    profileUrl: 'https://www.googleapis.com/oauth2/v1/userinfo',
    scopes: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
    parseProfile: obj => {
      var res: IResponse = { id: obj.id, email: obj.email, firstName: obj.given_name, lastName: obj.family_name, providerId: 'google' };
      return res;
    }
  },
  msoft: {
    authorizationUrl: 'https://login.live.com/oauth20_authorize.srf',
    profileUrl: 'https://apis.live.net/v5.0/me',
    scopes: 'wl.signin wl.basic wl.emails',
    parseProfile: obj => {
      var res: IResponse = { id: obj.id, email: '' /*TODO _.compact(_.values(obj.emails))[0]*/, firstName: obj.first_name, lastName: obj.last_name, providerId: 'msoft' };
      return res;
    }
  },
}

export function applyClientIds(clientIds: IClientIdsConfig) {
  //dosad clientIds.client_id do config. Chybi-li, login se nepouzije
  for (var p in config) if (clientIds[p]) (config[p] as IProviderConfig).client_id = clientIds[p]; else delete config[p];
}