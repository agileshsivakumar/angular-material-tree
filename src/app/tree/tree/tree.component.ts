import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { TreeService } from '../service/tree.service';
import { TreeModel } from '../model/tree.model';
import { TreeDataSource } from '../service/tree-data-source';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  providers: [TreeService]
})
export class TreeComponent {
  treeControl: FlatTreeControl<TreeModel>;
  treeDataSource: TreeDataSource;

  constructor(treeService: TreeService) {
    this.treeControl = new FlatTreeControl<TreeModel>(
      this.getLevel,
      this.isExpandable
    );
    this.treeDataSource = new TreeDataSource(this.treeControl, treeService);
    this.treeDataSource.data = treeService.initialData();
  }

  getLevel = (node: TreeModel) => node.level;

  isExpandable = (node: TreeModel) => node.isExpandable;

  hasChild = (_: number, _nodeData: TreeModel) => _nodeData.isExpandable;
}
