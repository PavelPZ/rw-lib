import { formaterFncs, IFormaterFncs, IFormater, TAllLangs } from './formaters';
import Globalize from "globalize-runtime";

//************* Runtime pro globalizaci
//allLocs(); //volana pouze jednou pri startu aplikace
//globalizeInit('cs'); //definice jazyka lokalizace, volano pri startu aplikace (difotni jazyk) a pro zmene lokalizace
//globalize.dateFull(new Date()); //pouziti formateru
//*************

//seznam predkompilovanych formatovacich funkci
export let globalize: IFormater;

//inicializace jazyka lokalizace
export function globalizeInit(loc: TAllLangs) {
  if (actLoc == loc) return;
  let glob = new Globalize(loc); actLoc = loc;
  globalize = {} as any;
  for (var p in formaterFncs) globalize[p] = formaterFncs[p](glob); //priprav funkce
}
let actLoc: string;
