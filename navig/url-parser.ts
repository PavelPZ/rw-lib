import { Exception } from '../lib/common';

const routeHookDefaultName = 'child';
const $isHashRouter = false;

interface IRouteNode {
  handlerId?: string;
  //hookId?: string; //nazev property v hook.parent Store, obsahujici RouteHookDispatcher. !hookId => routeDefaultPropName property
  [props: string]: any;
  par?: {}; //<storeId>.routeAction(par, hookId)
  child?: IRouteNode; //difotni child route hook
  childs?: { [hookId: string]: IRouteNode; }; //...other
  //... dalsi, named route hook
}

function decodeUrlLow(url: string): IRouteNode {
  if (!$isHashRouter) url = url.split('#')[0];
  url = '{' + url.replace(/\$\//g, '}').replace(/\//g, '{');
  let stack: Array<IDecodeStack> = []; let i = 0; let ch: string; let res: IDecodeStack = null;
  let parseRoute = (endIdx: number, st: IDecodeStack) => {
    let s = url.substring(st.openIdx, endIdx - 1);
    let parts = s.split(';');
    let propComp = parts[0].split('-'); if (propComp.length > 2) throw new Exception('propComp.length > 2');
    st.hookId = propComp.length == 1 ? null : propComp[0];
    st.route = { handlerId: propComp.length == 1 ? propComp[0] : propComp[1] };
    for (let i = 1; i < parts.length; i++) {
      const nv = parts[i].split('=');
      //if (!st.route.par) st.route.par = {};
      st.route[nv[0]] = decodeURIComponent(nv[1]);
    }
  };
  while (true) {
    if (i >= url.length) {
      if (stack.length >= 1) ch = '}'; else break;
      i = url.length + 1;
    } else {
      ch = url.charAt(i); i++;
    }
    switch (ch) {
      case '{':
        if (stack.length == 0) { res = { openIdx: i }; stack.push(res); break; } //root
        let last = stack[stack.length - 1];
        if (!last.route) parseRoute(i, last); //zpracuj sekvenci mezi {xxxx{
        stack.push({ openIdx: i }); //zacni novy stack
        break;
      case '}':
        if (stack.length == 0) break;
        let last2 = stack[stack.length - 1];
        if (!last2.route) parseRoute(i, last2); //zpracuj sekvenci mezi {xxxx}, xxx je bez { i }
        //let parProp = last2.hookId ? last2.hookId : routeHookDefaultName;
        //navazani na parent route
        let par = stack[stack.length - 2];
        if (par) {
          if (last2.hookId) { //childs sub-route
            if (!par.route.childs) par.route.childs = {};
            par.route.childs[last2.hookId] = last2.route;
          } else //child sub-route
            par.route[routeHookDefaultName] = last2.route;
        }
        //vyndej ze stacku
        stack.splice(stack.length - 1, 1);
        break;
    }
  }
  return res.route;
}

interface IDecodeStack {
  openIdx: number;
  route?: IRouteNode;
  hookId?: string;
}

function encodeUrl(st: IRouteNode): string {
  let res: Array<string> = [];
  encodeUrlLow(res, st, null);
  let url = res.join('');
  return clearSlashes(url.replace(/(\$\/)*$/g, ''));
}

function encodeUrlLow(res: Array<string>, st: IRouteNode, parentPropName?: string) {
  res.push((parentPropName ? parentPropName + '-' : '') + (st.handlerId ? st.handlerId : ''));
  let props = [];
  for (let p in st) if (routeParIgnores.indexOf(p) < 0) props.push(p);
  props.sort().forEach(p => res.push(`;${p}=${encodeURIComponent(st[p])}`));
  if (st.child) { res.push('/'); encodeUrlLow(res, st.child, null); res.push('$/'); }
  if (st.childs) {
    getChildsPropNames(st.childs).forEach(p => {
      res.push('/');
      encodeUrlLow(res, st.childs[p], p);
      res.push('$/');
    });
  }
}

function clearSlashes(path: string): string { return path.replace(/\/$/, '').replace(/^[\#\/\?]?/, ''); }

const routeParIgnores = ['child', 'childs', 'handlerId'];
function getChildsPropNames(st: IRouteNode): Array<string> {
  let props = [];
  for (let p in st) props.push(p);
  return props.sort();
}

export function test() {
  var url = encodeUrl({
    handlerId: 'hand1', a: 1, b: 2,
    child: {
      handlerId: 'hand2', c: 1, d: 2
    },
    childs: {
      ch1: {
        handlerId: 'hand3', e: 1, f: 2,
        child: {
          handlerId: 'hand31', c: 1, d: 2
        },
        childs: {
          ch1: {
            handlerId: 'hand32', e: 1, f: 2
          }, ch2: {
            handlerId: 'hand33', g: 1, h: 2
          }
        }
      },
      ch2: {
        handlerId: 'hand4', g: 1, h: 2
      }
    }
  });
  var dump = JSON.stringify(decodeUrlLow(url), null, 2);
  url = encodeUrl(decodeUrlLow(url));
  dump = JSON.stringify(decodeUrlLow(url), null, 2);
}