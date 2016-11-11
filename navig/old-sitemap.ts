import { Exception } from '../lib/common';

export namespace site {

  export interface INode {
    id: string | number;
    title?: string; //chybi-li, vezme se z ITab.title 
    brTitle?:string; //title pro breadcrumb
    createPage: (routePar) => JSX.Element,
    path?: string;
    childs?: Array<INode>;
    parent?: INode;
    largeLogo?: boolean; //velke logo v chladici
    tab?: ITab; //my tab
    noTitle?:boolean; //page template negeneruje title stranky
  }
  export var root: INode;
  export var nodes: { [path: string]: INode; } = {};

  export function bootApp() {
    function initNode(parent: INode, nd: INode) {
      nd.childs = nodeChilds(nd);
      nd.parent = parent;
      if (!nd.tab) nd.tab = nd.parent.tab;
      nd.path = getNodePath(nd);
      if (nodes[nd.path]) throw new Exception(`SiteMap node ${nd.path} already exists!`);
      nodes[nd.path] = nd;
      if (nd.childs) nd.childs.forEach(n => initNode(nd, n));
    }
    function initTabs() {
      tabs.$childs = []; var idx = 0;
      for (var p in tabs) {
        if (p.startsWith('$')) continue;
        var t: ITab = tabs[p]; tabs.$childs.push(t); t.idx = idx++;
        if (!t.rootNode) throw new Exception('!t.rootNode');
        t.rootNode.tab = t;
        if (!t.rootNode.title) t.rootNode.title = t.title;
      }
    }
    initTabs();
    initNode(null, root);
  }

  export function nodeParents(nd: INode, ignoreSelf?: boolean): Array<INode> {
    var res: nodeParentsResult = {};
    nodeParentsLow(nd, res, ignoreSelf);
    return res.res.reverse();
  }

  export interface ITabs {
    $childs?: Array<ITab>;
  }
  export interface ITab {
    title: string;
    idx?: number;
    rootNode?: INode; //hlavni stranka pro tab
  }
  export var tabs: ITabs;

  export var getBlankPage: (routePar) => JSX.Element;

  //*********** Private

  function nodeChilds(nd: INode): Array<INode> {
    var res: Array<INode> = null;
    for (var p in nd) {
      var subNd: INode = nd[p];
      if (!subNd /*|| !subNd.title*/ || !subNd.id) continue;
      if (!res) res = [subNd]; else res.push(subNd);
    }
    return res;
  }

  function nodeParentsLow(nd: INode, res: nodeParentsResult, ignoreSelf: boolean) {
    if (!res.res) res.res = ignoreSelf ? [] : [nd];
    while (nd.parent) { nd = nd.parent; res.res.push(nd); }
  }
  interface nodeParentsResult { res ?: Array<INode> }

  function getNodePath(nd: INode): string { return nodeParents(nd).map(n => n.id).join('|').toLowerCase(); }
}