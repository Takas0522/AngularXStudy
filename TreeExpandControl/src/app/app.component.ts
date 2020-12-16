import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussels sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

const transformer = (node: FoodNode, level: number) => {
  return {
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level,
  };
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  treeFlattener = new MatTreeFlattener(
    transformer, node => node.level, node => node.expandable, node => node.children);

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  expand(): void {
    this.treeControl.expand(this.treeControl.dataNodes[0]);
  }

  nodeToggele(node: ExampleFlatNode): void {
    const level = this.treeControl.getLevel(node);
    if (level < 1) {
      // 親が選択された場合のみ自分自身以外全部Collapse
      this.treeControl.dataNodes.forEach(f => {
        if (node !== f) {
          this.treeControl.collapse(f);
        }
      });
    }
  }

  getParent(node: ExampleFlatNode) {
    const currentLevel = this.treeControl.getLevel(node);
    if (currentLevel < 1) {
      return null;
    }
    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      if (this.treeControl.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
