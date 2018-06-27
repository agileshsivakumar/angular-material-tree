/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TreeService } from '../service/tree.service';
import { TreeModel } from '../model/tree.model';

@Injectable()
export class TreeDataSource {
  dataChange: BehaviorSubject<TreeModel[]> = new BehaviorSubject<TreeModel[]>(
    []
  );

  get data(): TreeModel[] {
    return this.dataChange.value;
  }
  set data(value: TreeModel[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(
    private treeControl: FlatTreeControl<TreeModel>,
    private database: TreeService
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<TreeModel[]> {
    if (this.treeControl.expansionModel.onChange) {
      this.treeControl.expansionModel.onChange.subscribe(change => {
        if (
          (change as SelectionChange<TreeModel>).added ||
          (change as SelectionChange<TreeModel>).removed
        ) {
          this.handleTreeControl(change as SelectionChange<TreeModel>);
        }
      });
    }
    return merge(collectionViewer.viewChange, this.dataChange).pipe(
      map(() => this.data)
    );
  }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<TreeModel>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: TreeModel, expand: boolean) {
    const children = this.database.getChildren(node.item);
    const index = this.data.indexOf(node);
    if (!children || index < 0) {
      // If no children, or cannot find the node, no op
      return;
    }
    node.isLoading = true;
    setTimeout(() => {
      if (expand) {
        const nodes = children.map(
          name =>
            new TreeModel(
              name,
              node.level + 1,
              this.database.isExpandable(name)
            )
        );
        this.data.splice(index + 1, 0, ...nodes);
      } else {
        this.data.splice(index + 1, children.length);
      }

      // notify the change
      this.dataChange.next(this.data);
      node.isLoading = false;
    }, 1000);
  }
}
