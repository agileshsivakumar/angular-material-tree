import { TreeModel } from '../model/tree.model';

/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
export class TreeService {
  treeMapping = {
    RootLevel1: ['Root1Child1', 'Root1Child2'],
    RootLevel2: ['Root2Child1', 'Root2Child2']
  };

  dataMap = new Map([
    ['RootLevel1', ['Apple', 'Orange', 'Banana']],
    ['RootLevel2', ['Tomato', 'Potato', 'Onion']],
    ['Apple', ['Fuji', 'Macintosh']],
    ['Onion', ['Yellow', 'White', 'Purple']]
  ]);

  rootLevelNodes = ['Fruits', 'Vegetables'];

  /** Initial data from database */
  initialData(): TreeModel[] {
    const rootLevelNodes = [];
    for (const key in this.treeMapping) {
      if (this.treeMapping.hasOwnProperty(key)) {
        rootLevelNodes.push(key);
      }
    }

    const rootLevelNodesMap = rootLevelNodes.map(
      name => new TreeModel(name, 0, true)
    );
    return rootLevelNodesMap;
  }

  getChildren(node: string): string[] | undefined {
    return this.dataMap.get(node);
  }

  isExpandable(node: string): boolean {
    return this.dataMap.has(node);
  }
}
