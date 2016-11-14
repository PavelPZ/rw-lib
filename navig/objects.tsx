import * as React from 'react';
import { Exception } from '../lib/common';

export abstract class TRouteHandler {
  constructor(public id: string) { }
  //virtuals
  abstract eq(node1: IRouteNode, node2: IRouteNode): boolean;
  abstract createComponent(node: IRouteNode): TCreateComponentResult;
  normalizeStringProps(node: IRouteNode) { }
  loginNeeded(node: IRouteNode): boolean { return false; }
  //statics
  static register(handler: TRouteHandler) { if (TRouteHandler.handlers[handler.id]) throw new Exception(handler.id); TRouteHandler.handlers[handler.id] = handler; }
  static find(id: string): TRouteHandler { var res = TRouteHandler.handlers[id]; if (!res) throw new Exception(`TRouteHandler.find: cannot find ${id} handler`); return res; }
  static handlers: { [id: string]: TRouteHandler; } = {};
}
export type TCreateComponentResult = JSX.Element | Promise<JSX.Element>;

export const trace = true;

//dekodovana URL adresa
export interface IRouteNode {
  handlerId: string; //handler id for route management
  //childs routes...
  child?: IRouteNode; //...default
  childs?: { [hookId: string]: IRouteNode; }; //...other
  //other route props
  [props: string]: any;
  //not persistent props
  $handler?: TRouteHandler;
  $toRender?: TCreateComponentResult; //TRouteHandler.createComponent vraci promise - jeji vysledek
}

//v context je parent INode 
export interface IHookPar extends React.Attributes {
  hookId: string; //identifikace IRouteNode z context.parentHook.state.child(s)[hookId]
}

//RouteHook se posila svym childs pomoci context, definice muzi byt pred deklaraci komponenty, jinak React chyba
var ContextType: React.ValidationMap<any> = { parentHook: React.PropTypes.object }
export interface IContext { parentHook: RouteHook; }

export class RouteHook extends React.Component<IHookPar, IRouteNode> {
  constructor(props: IHookPar, ctx: IContext) {
    super(props, ctx);
    if (!rootHook) rootHook = this;
    //child - parent
    if (ctx && ctx.parentHook) { //zanoreny hook - vyzobni state jmena <props.hookId> z parent hook
      this.parent = ctx.parentHook; //vyzobni this.props.hookId IRouteNode z parenta
      if (!this.parent.childs) this.parent.childs = [this]; else this.parent.childs.push(this);
      if (this.hookId() == 'child') {
        this.state = this.parent.state.child; 
      } else if (this.parent.state.childs) {
        this.state = this.parent.state.childs[this.hookId()];
      }
      if (!this.state) throw new Exception('!this.state');
    }
  }
  parent: RouteHook; //jsem zanoren pod jinym RouteHook
  childs: Array<RouteHook>; //jsem zanoren pod jinym RouteHook
  comp: TRouteComponent;

  hookId(): string { return this.props.hookId ? this.props.hookId : 'child'; }

  render(): JSX.Element {
    if (!this.state) return null;
    if (this.state.$toRender instanceof Promise) throw new Exception('res instanceof Promise');
    return this.state.$toRender;
  }

  componentWillUnmount() {
    //undo child - parent
    if (!this.parent || !this.parent.childs) return;
    var idx = this.parent.childs.indexOf(this); if (idx < 0) return;
    this.parent.childs.splice(idx, 1);
  }

  getChildContext(): IContext { return { parentHook: this }; }
  static childContextTypes = ContextType;
  static contextTypes = ContextType;
}

export abstract class RouteComponent<T,P> extends React.Component<T, P> {
  constructor(props, ctx: IContext) {
    super(props, ctx);
    //child - parent
    this.parent = ctx.parentHook; //vyzobni this.props.hookId IRouteNode z parenta
    this.parent.comp = this;
  }
  parent: RouteHook; //jsem zanoren pod jinym RouteHook
  componentWillUnmount() {
    //undo child - parent
    if (this.parent.comp !== this) throw new Exception('this.parent.comp !== this');
    delete this.parent.comp;
  }
  saveExternal(): Promise<any> { return null; }
  static contextTypes = ContextType;
}
export type TRouteComponent = RouteComponent<any,any>;

export let rootHook: RouteHook; //root hook
