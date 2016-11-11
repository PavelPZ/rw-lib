export type TProviderIds = 'google' | 'facebook' | 'msoft';

export interface IClientInfo {
  client_id?: string; //klic pro kumunikaci se serverem providera
  authorizationUrl?: string; //autorizacni URL
  profileUrl?: string; //url pro ziskani profile informaci
  scopes?: string; //identifikace udaju z profilu (email, ...)
  parseProfile?: (obj: any) => IResponse;
}

export interface IClientInfos {
  google: IClientInfo;
  facebook: IClientInfo;
  msoft: IClientInfo;
}

export interface IRequest {
  providerId: TProviderIds;
  client_id: string; //string, povolujici konkretni alikaci se prihlasit u providera
}

export interface IResponse {
  providerId: TProviderIds; 
  email:string; //uzivateluv email
  id: string; //id uzivatele u providera
  firstName?: string; 
  lastName?: string;
}