import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IRouteNode, rootHook, RouteHook } from './objects';
import { dispatchRoute, hookRoute } from './dispatcher';
import { decodeFullUrl, encodeFullUrl } from './url-parser';
import { Exception, loginHook, blockGuiHook, exceptionHook } from '../lib/common';

//navigate na route
export function navigate<T extends IRouteNode>(routes: T, ev?: React.SyntheticEvent, hook?: RouteHook) { if (ev) ev.preventDefault(); return rootRouteBind(adjustRoute(routes), true, hook); }

//start s inicialni route
export function initRouter<T extends IRouteNode>(startRoute: () => T) {
  if (!startRoute) return;
  getStartRoute = startRoute;
  ReactDOM.render(<RouteHook hookId={null} />, document.getElementById('content'));
  rootRouteBind(adjustRoute(decodeFullUrl()), false);
}
let getStartRoute: () => IRouteNode;


//***************** POPSTATE EVENT
window.addEventListener("popstate", ev => {
  console.log(`> popstate: ${window.location.href}`);
  rootRouteBind(adjustRoute(decodeFullUrl()), false);
});

//modify browser URL
function pushState(route: IRouteNode) {
  let urlStr = encodeFullUrl(route);
  console.log(`> pushState: ${urlStr}`);
  history.pushState(null, null, urlStr);
}

function adjustRoute(route: IRouteNode): IRouteNode { return route ? route : getStartRoute(); }

function rootRouteBind(route: IRouteNode, withPustState: boolean, hook?: RouteHook) {
  if (!hook) hook = rootHook;
  blockGuiHook.block(true);
  dispatchRoute(route, hook).then(needsLogin => {
    blockGuiHook.block(false);
    if (needsLogin) loginHook.doLogin(hookRoute());
    else if (withPustState) pushState(hookRoute());
  }).catch(err => exceptionHook.onError(err));
}

