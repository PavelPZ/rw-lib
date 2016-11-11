import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { router } from 'old-router-lib';
import { site } from 'old-sitemap';
import { Exception, TCallback } from '../lib/common';

namespace sitemapRouter {

  export var childContextTypes: React.ValidationMap<any> = {
    site: React.PropTypes.object,
    route: React.PropTypes.object,
  }

  export class AppRootComponent extends React.Component<IRootProps, router.TRouteActionPar> {
    constructor(p: IRootProps, ctx) {
      super(p, ctx);
      this.state = p.initRoute;
      rootComp = this;
    }
    render(): JSX.Element {
      this.actNode = site.nodes[this.state.storeId.toLowerCase()];
      if (!this.actNode) throw new Exception(`Node path ${this.state.storeId} not found`);
      var res = (this.actNode.createPage ? this.actNode.createPage : site.getBlankPage)((this.state.par));
      return res;
    }
    actNode: site.INode;

    getChildContext(): IContext {
      return {
        site: this.actNode,
        route: this.state
      };
    }
    static childContextTypes = childContextTypes;
  }

  export function navigateUrl<T>(node: site.INode, par?: T) { router.navigateUrl({ storeId: node.path, par: par }); }
  export function doNavigate<T>(node: site.INode, ev?: React.SyntheticEvent, par?: T) { router.doNavigate({ storeId: node.path, par: par }, ev); }
  export function doNavigateTag<T>(node: site.INode, ev?: React.SyntheticEvent, par?: T): JSX.Element {
    return <a href="#" key={node.path} onClick={ev => doNavigate(node, ev, par) }>{node.title}</a>;
  }

  export function createElement<P>(type: React.ComponentClass<P> | React.SFC<P>, routePar, props: P & React.Attributes, ...children: React.ReactNode[]): React.ReactElement<P> {
    var par: P = Object.assign(Object.assign({}, props), routePar);
    return React.createElement(type, par);
  }

  export function bootApp(content: HTMLElement, sitemapCreator: TCallback) {
    sitemapCreator();
    site.bootApp();
    var startRoute = router.bootApp();
    ReactDOM.render(<AppRootComponent initRoute={ startRoute } />, content);
  }

  export interface IContext {
    site: site.INode;
    route: router.TRouteActionPar
  }

  //********** Private
  var rootComp: AppRootComponent;
  export interface IRootProps { initRoute: router.TRouteActionPar }

  router.getStartRoute = () => { return { storeId: site.root.path }; };
  router.onRouteChanged = route => { if (rootComp) rootComp.setState(route); };

}