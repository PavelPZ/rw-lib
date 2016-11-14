import { Exception, loginHook } from '../lib/common';
import { IRouteNode, RouteHook, TRouteHandler, rootHook, TRouteComponent, trace } from './objects';

//***************
// pouzije dekodovany IRouteNode-tree k aktualizaci component-tree (tj. React componet tree, composed form RouteHook, RouteComponent etc.)
// RouteHook je placeholder, ktery renderuje komponentu (za pomoci IRouteNode a RouteHandler)
// renderuji se pouze ty RouteHook, jejichz IRouteNode se zmenil
// vse de deje v dispatchRoute, vcetne:
// - asyncronniho vytvoreni RouteComponent v RouteHandler.createComponent
// - asyncronniho unmount stavajicich nahrazenych komponent

// - RouteHook.state obsahuje plain IRouteNode, bez child props. Cely IRouteNode-tree se musi vzdy dynamicky slozit pomoci routeFromHookTree

// Vice viz dokumentace dispatchRoute

// modifikace hook casti component-subtree pomoci noveho route IRouteNode-subtree 
export function dispatchRoute(route: IRouteNode, hook: RouteHook): Promise<Boolean> {
  return new Promise<Boolean>((resolve, reject) => {
    //vytvori modifikovany kompletni IRouteNode-tree
    route = modifyRoute(hook, route);
    //normalize string props and set $handler
    prepareRoute(route);
    if (trace) console.log(`dispatchRoute final route: ${JSON.stringify(route)}`);
    //all modified hooks
    let modified: Array<getModifiedResult> = []; getModified(route, rootHook, modified);
    //all new routes
    let newRoutes: Array<IRouteNode> = [];
    modified.forEach(m => forEachRoutes(m.route, r => newRoutes.push(r)));
    //login needed test
    if (!loginHook.isLogged() && newRoutes.find(r => handler(r).loginNeeded(r))) { resolve(true); return; }
    //all hooks, which will be unmounted
    let oldHooks: Array<RouteHook> = []; modified.forEach(m => eachHook(m.hook, oldHooks));
    //saveExtarnals for components, which will be unmounted
    let saveExternals: Array<Promise<any>> = []; oldHooks.forEach(h => { let ext = h.comp.saveExternal(); if (ext) saveExternals.push(ext); });
    //wait for all saveExternals
    Promise.all(saveExternals).then(() => {
      //create new components (including loadExternals)
      let loadExternals: Array<IRouteNode> = [];
      newRoutes.forEach(r => {
        r.$toRender = handler(r).createComponent(r);
        if (r.$toRender instanceof Promise) loadExternals.push(r);
      });
      //wait for loadExternals for newly created components
      Promise.all(loadExternals.map(r => r.$toRender)).then(all => {
        //get promise result
        for (let i = 0; i < loadExternals.length; i++) loadExternals[i].$toRender = all[i];
        //update modified hooks
        modified.forEach(m => { m.hook.state = m.route; m.hook.forceUpdate() });
        //clear route temporary $-props and child subroutes
        let newHooks: Array<RouteHook> = []; eachHook(rootHook, newHooks);
        newHooks.forEach(h => { delete h.state.$toRender; delete h.state.child; delete h.state.childs; });
        //return;
        resolve(false);
      });
    });
  });
}

export function hookRoute(actHook?: RouteHook) {
  let res: IRouteNode; if (!actHook) actHook = rootHook;
  routeFromHookTree(actHook, val => res = val); //v res je old IRouteNode-tree
  return res;
}

export interface IDispatchRouteResult { needsLogin: boolean; newRoute: IRouteNode; }
interface getModifiedResult { route: IRouteNode, hook: RouteHook } //hook a jeho novy state v route

//hook - part of component-tree is modified to newValue. Return modified route.
function modifyRoute(hook: RouteHook, newValue: IRouteNode): IRouteNode {
  if (hook === rootHook) return newValue;
  let res = hookRoute();
  //nalezni PATH k hook.parent (- seznam hookId's)
  let parentHooks: Array<string> = [];
  var par = hook.parent;
  while (par.parent) { parentHooks.push(par.parent.hookId()); par = par.parent; }
  parentHooks = parentHooks.reverse();
  //by means of PATH find parent IRouteNode
  let actNode = res;
  parentHooks.forEach(hookId => actNode = hookId == 'child' ? actNode.child : actNode.childs[hookId]);
  //bind newValue to parent
  if (hook.hookId() == 'child') actNode.child = newValue; else actNode.childs[hook.hookId()] = newValue;
  return res;
}

//get IRouteNode-tree from component-tree
function routeFromHookTree(actHook: RouteHook, setter: (copy: IRouteNode) => void) {
  //kopie RouteHook.state
  let val: IRouteNode = JSON.parse(JSON.stringify(actHook.state));
  //set this copy to parent
  setter(val);
  //recursion
  if (actHook.childs) actHook.childs.forEach(subHook => {
    routeFromHookTree(subHook, subVal => {
      //copy to parent proc
      if (subHook.hookId() == 'child') val.child = subVal;
      else {
        if (!val.childs) val.childs = {};
        val.childs[subHook.hookId()] = subVal;
      }
    });
  });
}

//normalizuje non-string properties a naplni $handler
function prepareRoute(route: IRouteNode) {
  forEachRoutes(route, r => handler(r).normalizeStringProps(r));
}

function forEachRoutes(route: IRouteNode, action: (route: IRouteNode) => void) {
  action(route);
  if (route.child) forEachRoutes(route.child, action); if (route.childs) for (var p in route.childs) forEachRoutes(route.childs[p], action);
}

function eachHook(hook: RouteHook, res: Array<RouteHook>) { if (hook.state) res.push(hook); if (hook.childs) hook.childs.forEach(h => eachHook(h, res)); }

function handler(route: IRouteNode) { return TRouteHandler.find(route.handlerId); }

//rekursivni pruchod component-tree, vrati modifikovane hooks (kde RouteHandler.eq()==false)
function getModified(route: IRouteNode, hook: RouteHook, res: Array<getModifiedResult>) {
  if (hook.state && hook.state.handlerId == route.handlerId && handler(route).eq(hook.state, route)) { //the same route => rekurze
    if (hook.childs)
      hook.childs.forEach(subHook => {
        let subRoute = subHook.hookId() == 'child' ? route.child : route.childs[subHook.hookId()];
        getModified(subRoute, subHook, res);
      });
  } else //different route, stop recursion
    res.push({ route: route, hook: hook });
}

