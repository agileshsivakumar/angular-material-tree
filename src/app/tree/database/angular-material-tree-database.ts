import { AngularMaterialTreeModel } from '../model/angular-material-tree-model';

/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
export class AngularMaterialTreeDatabase {
  dataMap = new Map([
    ['Fruits', ['Apple', 'Orange', 'Banana']],
    ['Vegetables', ['Tomato', 'Potato', 'Onion']],
    ['Apple', ['Fuji', 'Macintosh']],
    ['Onion', ['Yellow', 'White', 'Purple']]
  ]);

  rootLevelNodes = ['Fruits', 'Vegetables'];

  /** Initial data from database */
  initialData(): AngularMaterialTreeModel[] {
    return this.rootLevelNodes.map(
      name => new AngularMaterialTreeModel(name, 0, true)
    );
  }

  getChildren(node: string): string[] | undefined {
    return this.dataMap.get(node);
  }

  isExpandable(node: string): boolean {
    return this.dataMap.has(node);
  }
}
