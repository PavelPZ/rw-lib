import { formaterFncs, IFormaterFncs, IFormater, TAllLangs } from './formaters';
import Globalize from "globalize-runtime";

export let globalize: IFormater;
export function globalizeInit(loc: TAllLangs) {
  if (actLoc == loc) return;
  let glob = new Globalize(loc); actLoc = loc;
  globalize = {} as any;
  for (var p in formaterFncs) globalize[p] = formaterFncs[p](glob);
}
let actLoc: string;
