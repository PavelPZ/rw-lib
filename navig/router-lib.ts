import * as React from 'react';
import { Exception } from '../lib/common';

export interface IRouteNode {
}


export namespace router {

  //difotni route pro pripad, ze je URL prazdna
  export var getStartRoute: () => TRouteActionPar; 

  //boot routeru
  export function bootApp(): TRouteActionPar { return rootRouteBind(decodeFullUrl(), false); }

  //navigace na route
  export function doNavigate(routes: TRouteActionPar, ev?: React.SyntheticEvent) { if (ev) ev.preventDefault(); return rootRouteBind(routes, true); }
  export function navigateUrl(routes: TRouteActionPar): string { return encodeFullUrl(routes); }

  //route changed notification
  export var onRouteChanged: (route: TRouteActionPar) => void;

  //config
  export var $isHashRouter = false; //hash or slash route delimiter
  export var $basicUrl = getBasicUrl(window.location.href); //cast URL pred route paramatter

  //rooute objekt structure
  export interface TRouteActionPar {
    storeId?: string;
    hookId?: string; //nazev property v hook.parent Store, obsahujici RouteHookDispatcher. !hookId => routeDefaultPropName property
    par?: {}; //<storeId>.routeAction(par, hookId)
    routeHookDefault?: TRouteActionPar; //difotni child route hook
    //... dalsi, named route hook
  }


  //***************** refresh view on route change
  //aktualni route objekt
  //var route: TRouteActionPar;

  function rootRouteBind(routes: TRouteActionPar /*null => start route*/, withPustState: boolean): TRouteActionPar {
    if (!routes) routes = getStartRoute ? getStartRoute() : null; if (!routes) throw new Exception(`missing routes`);
    //route = routes;
    if (onRouteChanged) onRouteChanged(routes);
    if (withPustState) pushState(routes);
    return routes;
  }

  //***************** POPSTATE EVENT
  window.addEventListener("popstate", ev => {
    console.log(`> popstate: ${window.location.href}`);
    rootRouteBind(decodeFullUrl(), false);
  });

  //modify browser URL
  function pushState(route: TRouteActionPar) {
    let urlStr = encodeFullUrl(route);
    console.log(`> pushState: ${urlStr}`);
    history.pushState(null, null, urlStr);
  }

  //routa pars are after ".html" url part
  function getBasicUrl(startUrl: string): string { let idx = startUrl.toLowerCase().indexOf('.html'); return idx >= 0 ? startUrl.substr(0, idx + 5) : startUrl; }

  var routeParIgnores = ['storeId', 'hookId', 'par'];
  var routeHookDefaultName = 'routeHookDefault';

  function encodeUrl(st: TRouteActionPar): string {
    let res: Array<string> = [];
    encodeUrlLow(res, st, null);
    let url = res.join('');
    return clearSlashes(url.replace(/(\$\/)*$/g, ''));
  }

  function encodeFullUrl(st: TRouteActionPar): string {
    let urlStr = st ? encodeUrl(st) : null;
    //return $basicUrl + (urlStr ? ($isHashRouter ? '#' : '/') + urlStr : '');
    return $basicUrl + (urlStr ? ($isHashRouter ? '#' : '?') + urlStr : '');
  }

  function decodeFullUrl(url?: string): TRouteActionPar {
    return decodeUrl(decodeUrlPart(url));
  }

  function decodeUrlPart(url?: string): string {
    if (!url) url = window.location.href;
    if (!url.toLowerCase().startsWith($basicUrl)) throw new Exception(`location.href does not start with ${$basicUrl}`);
    return clearSlashes(url.substr($basicUrl.length));
  }

  function decodeUrl(url?: string): TRouteActionPar {
    if (!url) return null;
    return decodeUrlLow(url);
  }

  function createRoute(storeId: string, par?: {}, routeHookDefault?: TRouteActionPar, otherHooks?: { [name: string]: TRouteActionPar; }): TRouteActionPar {
    let res: TRouteActionPar = { storeId: storeId, par: par };
    if (routeHookDefault) { res.routeHookDefault = routeHookDefault; delete routeHookDefault.hookId; }
    if (otherHooks)
      for (let p in otherHooks) { let hk = res[p] = otherHooks[p]; hk.hookId = p; }
    return res;
  }

  function getChildRoutePropNames(st: TRouteActionPar): Array<string> {
    let props = [];
    for (let p in st) if (routeParIgnores.indexOf(p) < 0) props.push(p);
    return props;
  }

  function decodeUrlLow(url: string): TRouteActionPar {
    if (!$isHashRouter) url = url.split('#')[0];
    url = '{' + url.replace(/\$\//g, '}').replace(/\//g, '{');
    let stack: Array<IDecodeStack> = []; let i = 0; let ch: string; let res: IDecodeStack = null;
    let parseRoute = (endIdx: number, st: IDecodeStack) => {
      let s = url.substring(st.openIdx, endIdx - 1);
      let parts = s.split(';');
      let propComp = parts[0].split('-'); if (propComp.length > 2) throw new Exception('propComp.length > 2');
      st.hookId = propComp.length == 1 ? null : propComp[0];
      st.route = { storeId: propComp.length == 1 ? propComp[0] : propComp[1] };
      for (let i = 1; i < parts.length; i++) {
        const nv = parts[i].split('=');
        if (!st.route.par) st.route.par = {};
        st.route.par[nv[0]] = decodeURIComponent(nv[1]);
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
          let parProp = last2.hookId ? last2.hookId : routeHookDefaultName;
          if (parProp != routeHookDefaultName) last2.route.hookId = parProp;
          //navazani na parent route
          let par = stack[stack.length - 2];
          if (par) par.route[parProp] = last2.route;
          //vyndej ze stacku
          stack.splice(stack.length - 1, 1);
          break;
      }
    }
    return res.route;
  }

  interface IDecodeStack {
    openIdx: number;
    route?: TRouteActionPar;
    hookId?: string;
  }

  function encodeUrlLow(res: Array<string>, st: TRouteActionPar, parentPropName?: string) {
    res.push((parentPropName ? parentPropName + '-' : '') + (st.storeId ? st.storeId : ''));
    if (st.par) {
      let props = [];
      for (let p in st.par) props.push(p);
      props.sort().forEach(p => res.push(`;${p}=${encodeURIComponent(st.par[p])}`));
    }
    getChildRoutePropNames(st).sort().forEach(p => {
      res.push('/');
      encodeUrlLow(res, st[p], p == routeHookDefaultName ? null : p);
      res.push('$/');
    });
  }

  function clearSlashes(path: string): string { return path.replace(/\/$/, '').replace(/^[\#\/\?]?/, ''); }
}