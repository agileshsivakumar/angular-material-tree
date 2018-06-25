import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { AngularMaterialTreeDatabase } from '../database/angular-material-tree-database';
import { AngularMaterialTreeModel } from '../model/angular-material-tree-model';
import { AngularMaterialTreeService } from '../service/angular-material-tree.service';

@Component({
  selector: 'app-angular-material-tree',
  templateUrl: './angular-material-tree.component.html',
  styleUrls: ['./angular-material-tree.component.scss'],
  providers: [AngularMaterialTreeDatabase]
})
export class AngularMaterialTreeComponent {
  treeControl: FlatTreeControl<AngularMaterialTreeModel>;
  dataSource: AngularMaterialTreeService;

  constructor(database: AngularMaterialTreeDatabase) {
    this.treeControl = new FlatTreeControl<AngularMaterialTreeModel>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new AngularMaterialTreeService(
      this.treeControl,
      database
    );

    this.dataSource.data = database.initialData();
  }

  getLevel = (node: AngularMaterialTreeModel) => {
    return node.level;
  }

  isExpandable = (node: AngularMaterialTreeModel) => {
    return node.expandable;
  }

  hasChild = (_: number, _nodeData: AngularMaterialTreeModel) => {
    return _nodeData.expandable;
  }
}
