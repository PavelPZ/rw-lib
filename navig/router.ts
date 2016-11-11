import * as React from 'react';
import { IRouteNode, getStartRoute, rootHook, RouteHook, routeReplaceStringProps } from './dispatcher';
import { decodeFullUrl, encodeFullUrl } from './url-parser';
import { Exception } from '../lib/common';

//navigate na route
export function navigate<T extends IRouteNode>(routes: T, ev?: React.SyntheticEvent, hook?: RouteHook) { if (ev) ev.preventDefault(); return rootRouteBind(adjustRoute(routes), true, hook); }

//***************** POPSTATE EVENT
window.addEventListener("popstate", ev => {
  console.log(`> popstate: ${window.location.href}`);
  rootRouteBind(routeReplaceStringProps(adjustRoute(decodeFullUrl())), false);
});

//modify browser URL
function pushState(route: IRouteNode) {
  let urlStr = encodeFullUrl(route);
  console.log(`> pushState: ${urlStr}`);
  history.pushState(null, null, urlStr);
}

function adjustRoute(route: IRouteNode): IRouteNode { return route ? route : getStartRoute(); }

function rootRouteBind(routes: IRouteNode /*null => start route*/, withPustState: boolean, hook?: RouteHook): IRouteNode {
  if (!hook) hook = rootHook;
  hook.dispatchRoute(routes);
  if (withPustState) pushState(routes);
  return routes;
}

