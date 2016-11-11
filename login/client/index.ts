import { IClientInfos, IRequest, IResponse, TProviderIds, IClientInfo } from '../common';
import { webConfig } from './config';

export function init() {
  //dosad clientIds.client_id do config. Chybi-li, login se nepouzije
  for (var p in config) if (webConfig[p]) (config[p] as IClientInfo).client_id = (webConfig[p] as IClientInfo).client_id; else delete config[p];
}

//see D:\LMCom\rew\TheWeb\wwwroot\Common\lib\oauth.ts
let config: IClientInfos = {
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

