import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Exception } from '../lib/common';

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

export abstract class TRouteHandler {
  constructor(public id: string) { }
  eq(node1: IRouteNode, node2: IRouteNode): boolean { return node1.handlerId == node2.handlerId; }
  abstract getComponentClass(node: IRouteNode): React.ComponentClass<IRouteNode>;
  static register(handler: TRouteHandler) { if (TRouteHandler.handlers[handler.id]) throw new Exception(handler.id); TRouteHandler.handlers[handler.id] = handler; }
  static find(id: string): TRouteHandler { return TRouteHandler.handlers[id]; }
  static handlers: { [id: string]: TRouteHandler; } = {};
}

export var ContextType: React.ValidationMap<any> = {
  parentHook: React.PropTypes.object,
}
export interface IContext {
  parentHook: RouteHook;
}

//v context je parent INode 
export interface IHookPar extends React.Attributes { hookId: string; initStatus?: IRouteNode; }

export class RouteHook extends React.Component<IHookPar, IRouteNode & React.ComponentState> {
  constructor(props: IHookPar, ctx: IContext) {
    super(props, ctx);
    if (ctx && ctx.parentHook) {
      this.parent = ctx.parentHook;
      this.state = !this.props.hookId || this.props.hookId == 'child' ? ctx.parentHook.state.child : ctx.parentHook.state.childs[this.props.hookId];
    } else if (props.initStatus) {
      this.state = props.initStatus;
    }
  }
  routeChanged<T extends IRouteNode>(newRoute: T) {
    if (this.state && TRouteHandler.find(this.state.handlerId).eq(this.state, newRoute)) { //the same state => enumerate child hooks
      if (this.state.child) this.state.child.$myHook.routeChanged(newRoute.child);
      if (this.state.childs) for (let p in this.state.childs) this.state.childs[p].$myHook.routeChanged(newRoute.childs[p]);
    } else { //state changed => set route to state tree and force update
      if (this.parent) this.parent.state[this.props.hookId] = newRoute;
      this.state = newRoute;
      this.forceUpdate();
    }
  }
  parent: RouteHook;
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

export function acceptRoute<T extends IRouteNode>(route: T, from?: RouteHook) {
  if (!from) from = rootHook;
  rootHook.routeChanged(route);
}

let rootHook: RouteHook;
export function initRouteModule<T extends IRouteNode>(st: T) {
  rootHook = ReactDOM.render(<RouteHook hookId={null} initStatus={st} />, document.getElementById('content')) as RouteHook;
}

