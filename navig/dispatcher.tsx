//***************
// pouzije dekodovany IRouteNode tree k aktualizaci React DOM
// RouteHook je placeholder, ktery renderuje komponentu (za pomoci IRouteNode a RouteHandler)
// renderuji se pouze ty RouteHook, jejichz IRouteNode se zmenil

// Vice
/*
- URL se v url-parser dekoduje do IRouteNode tree.
- IRouteNode se dispatchuje do RouteHook
- RouteHook budto provede render (pokud je "jeho" state odlisny od IRouteNode) nebo provede rekurzivni dispatch na child IRouteNode (uschovane v IRouteNode.child nebo v IRouteNode.childs)
- RouteHook vyuzije ke sve cinnosti RouteHandler
  - k zjisteni komponenty, co se do RouteHook vykresli (TRouteHendler.getComponentClass)
  - k porovnani, zdali se RouteHook state zmenil nebo ne (TRouteHendler.eq)
*/

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Exception } from '../lib/common';

//pouzit route na "from" hook nebo na rootHook hook.
//export function dispatchRoute<T extends IRouteNode>(route: T, from?: RouteHook) {
//  if (!from) from = rootHook;
//  rootHook.dispatchRoute(route);
//}

export let rootHook: RouteHook; //root hook

//start s inicialni route
export function initRouteDispatcher<T extends IRouteNode>(startRoute: () => T) {
  getStartRoute = startRoute;
  rootHook = ReactDOM.render(<RouteHook hookId={null} initStatus={getStartRoute()} />, document.getElementById('content')) as RouteHook;
}
export let getStartRoute: () => IRouteNode;

export function routeReplaceStringProps(route: IRouteNode): IRouteNode {
  TRouteHandler.find(route.handlerId).normalizeStringProps(route);
  if (route.child) routeReplaceStringProps(route.child);
  if (route.childs) for (var p in route.childs) routeReplaceStringProps(route.childs[p]);
  return route;
}

//dekodovana URL adresa
export interface IRouteNode {
  handlerId: string; //handler id for route management
  //childs routes...
  child?: IRouteNode; //...default
  childs?: { [hookId: string]: IRouteNode; }; //...other
  //other route props
  [props: string]: any;
  //not persistent props
  $myHook?: RouteHook; //
}

//na zaklade IRouteNode.handlerId se najde aktualni handler k IRouteNode
//pomuze pak s RouteHook.render apod.
export abstract class TRouteHandler {
  constructor(public id: string) { }
  abstract eq(node1: IRouteNode, node2: IRouteNode): boolean; 
  abstract getComponentClass(node: IRouteNode): React.ComponentClass<IRouteNode>;
  abstract normalizeStringProps(node: IRouteNode);
  static register(handler: TRouteHandler) { if (TRouteHandler.handlers[handler.id]) throw new Exception(handler.id); TRouteHandler.handlers[handler.id] = handler; }
  static find(id: string): TRouteHandler { return TRouteHandler.handlers[id]; }
  static handlers: { [id: string]: TRouteHandler; } = {};
}

//RouteHook se posila svym childs pomoci context
export var ContextType: React.ValidationMap<any> = {
  parentHook: React.PropTypes.object,
}
export interface IContext {
  parentHook: RouteHook;
}

//v context je parent INode 
export interface IHookPar extends React.Attributes {
  hookId: string; //jakou child IRouteNode z context.parentHook provest dispatch
  initStatus?: IRouteNode; //pokud se nenalezne IRouteNode, je sance pouzit difotni. Pouzito v ReactDOM.render k inicializaci root hook
}

export class RouteHook extends React.Component<IHookPar, IRouteNode & React.ComponentState> {
  constructor(props: IHookPar, ctx: IContext) {
    super(props, ctx);
    if (ctx && ctx.parentHook) { //zanoreny hook
      this.parent = ctx.parentHook; //vyzobni this.props.hookId IRouteNode z parenta
      this.state = !this.props.hookId || this.props.hookId == 'child' ? ctx.parentHook.state.child : ctx.parentHook.state.childs[this.props.hookId];
    } else if (props.initStatus) { //neni zanoreny hook: sance pouzit initStatus
      this.state = props.initStatus;
    }
  }
  //rekurzivni dispatch na IRouteNode tree
  dispatchRoute<T extends IRouteNode>(newRoute: T) {
    if (this.state && this.state.handlerId == newRoute.handlerId && TRouteHandler.find(this.state.handlerId).eq(this.state, newRoute)) { //the same state => enumerate child hooks
      if (this.state.child) this.state.child.$myHook.dispatchRoute(newRoute.child);
      if (this.state.childs) for (let p in this.state.childs) this.state.childs[p].$myHook.dispatchRoute(newRoute.childs[p]);
    } else { //state changed => set route to state tree and force update
      if (this.parent) this.parent.state[this.props.hookId] = newRoute;
      this.state = newRoute;
      this.forceUpdate();
    }
  }
  parent: RouteHook; //jsem zanoren pod jinym RouteHook
  render(): JSX.Element {
    if (!this.state) return null;
    this.state.$myHook = this;
    return React.createElement(TRouteHandler.find(this.state.handlerId).getComponentClass(this.state), this.state);
  }
  getChildContext(): IContext { return { parentHook: this }; }
  static childContextTypes = ContextType;
  static contextTypes = ContextType;
}

export abstract class RouteComponent<TProp extends IRouteNode> extends React.Component<TProp, {}> { }




