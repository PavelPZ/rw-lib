import * as React from 'react';
import { IRouteNode, RouteHook, TRouteHandler, RouteComponent, TCreateComponentResult } from './objects';
import { initRouter, navigate } from './router';
import { hookRoute } from './dispatcher';
import { counter } from '../lib/common';

//**************** Home component
interface IHomeRouterNode extends IRouteNode { title: string; }
interface IHomeProps { title: string; }
const homeHandlerId = '$home';
class Home extends RouteComponent<IHomeProps, any> {
  render(): JSX.Element {
    return <div>
      <h1 onClick={ev => {
        var newRoute = hookRoute() as IHomeRouterNode; newRoute.title = this.props.title + 'x';
        console.log(`test.render: ${JSON.stringify(newRoute)}`);
        navigate<IHomeRouterNode>(newRoute, ev);
      } }>{this.props.title}</h1>
      <RouteHook hookId='child' key={counter.value++} />
      <RouteHook hookId='other' key={counter.value++} />
    </div>;
  }
  saveExternal(): Promise<any> { return new Promise(resolve => setTimeout(() => resolve(), 500)) }
}

class HomeHandler extends TRouteHandler {
  eq(node1: IHomeRouterNode, node2: IHomeRouterNode): boolean { return node1.title == node2.title; }
  createComponent(node: IHomeRouterNode): TCreateComponentResult {
    return new Promise<JSX.Element>(resolve => {
      setTimeout(() => resolve(<Home title={node.title} />), 500);
    });
  }
}
TRouteHandler.register(new HomeHandler(homeHandlerId));

//**************** Child component
interface IChildRouterNode extends IRouteNode { caption: string; }
interface IChildProps { caption: string; }
const childHandlerId = '$child';

class Child extends RouteComponent<IChildProps, any> {
  render(): JSX.Element {
    return <h2 onClick={ev => navigate<IChildRouterNode>({ caption: this.props.caption + 'x', handlerId: childHandlerId }, ev, this.parent)}>{this.props.caption}</h2>
  }
  saveExternal(): Promise<any> { return new Promise(resolve => setTimeout(() => resolve(), 500)) }
}

class ChildHandler extends TRouteHandler {
  eq(node1: IChildRouterNode, node2: IChildRouterNode): boolean { return node1.caption == node2.caption; }
  createComponent(node: IChildRouterNode): TCreateComponentResult {
    return new Promise<JSX.Element>(resolve => {
      setTimeout(() => resolve(<Child caption={node.caption} />), 500);
    });
  }
}
TRouteHandler.register(new ChildHandler(childHandlerId));

//********** Init call
export function init() {
  initRouter<IHomeRouterNode>(() => {
    return {
      title: 'Home-Page', handlerId: homeHandlerId,
      child: { caption: 'Child-Page-1', handlerId: childHandlerId },
      childs: { other: { caption: 'Child-Page-2', handlerId: childHandlerId } },
    };
  });
}

