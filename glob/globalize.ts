import { formaterFncs, IFormaterFncs, IFormater } from './formaters';
import { LangType } from './all-langs'
import * as cookie from '../lib/cookie'
import Globalize from "globalize-runtime";
//import 'rw-lib/glob/locale-data/en'

//*************
const actLangCookieName = 'act-lang';

//globalize initialization for default lang (extracted from cookie or navigator)
export function globalizeInit(): Promise<IFormater> {
  return initLocale(initLang());
}

//seznam predkompilovanych formatovacich funkci pro aktualni jazyk
export let globalize: IFormater;

//change globalize lang. 
export function initLocale(loc: LangType, withSaveToGlobal: boolean = true): Promise<IFormater> {
  return new Promise<IFormater>((resolve, reject) => {
    if (globalize && globalize.locale == loc) resolve(globalize);
    System.import(`rw-lib/glob/locale-data/${loc}`).then(m => {
      let glob = new Globalize(loc);
      let res: IFormater = { locale: loc } as any;
      for (var p in formaterFncs) res[p] = formaterFncs[p](glob); //priprav funkce
      if (withSaveToGlobal) {
        cookie.write(actLangCookieName, loc, true);
        globalize = res;
      }
      resolve(res);
    })
  });
}

//get default lang
export function initLang(): LangType {
  let actLang = cookie.read(actLangCookieName) as LangType;
  if (actLang) return actLang;
  const navigEx = navigator as any as navigatorEx;
  actLang = <LangType>((navigEx.languages && navigEx.languages[0]) || navigEx.language || navigEx.userLanguage);
  return actLang.toLowerCase().split(/[_-]+/)[0] as LangType;
}

//navigator overload
interface navigatorEx {
  languages: Array<string>;
  userLanguage: string;
  language: string;
}
