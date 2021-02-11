import { FlatTreeControl, TreeControl } from '@angular/cdk/tree';
import { Injectable } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

export interface FlatNode {
  expandable: boolean;
  value: any[];
  level: number;
}

@Injectable({
    providedIn: 'root'
})
export class PresudoTableWithTreeService {

  parseStructure<T>(datas: T[]): any[] {
    const retDatas: {
      values: any[],
      treeDataSource: MatTreeFlatDataSource<any, FlatNode, FlatNode> | null,
      treeControl: TreeControl<any, FlatNode> | null
    }[] = [];
    datas.forEach((f: any) => {
      const values: any[] = [];
      let treeDataSource: MatTreeFlatDataSource<any, FlatNode, FlatNode> | null = null;
      let treeControl: FlatTreeControl<any, FlatNode> | null = null;
      for (const iterator of Object.keys(f)) {
        const value = f[iterator];
        const type = Object.prototype.toString.call(value);
        if (type !== '[object Array]') {
          values.push(value);
        } else {
          treeControl = this.genFlatTreeControl();
          const dataSource = this.genDataSource(treeControl);
          dataSource.data = value;
          treeDataSource = dataSource;
        }
      }
      const retData: {
        values: any[],
        treeDataSource: MatTreeFlatDataSource<any, FlatNode, FlatNode> | null,
        treeControl: TreeControl<any, FlatNode> | null
      } = {
        values,
        treeDataSource,
        treeControl
      };
      retDatas.push(retData);
    });
    return retDatas;
  }

  private transformer = (node: any, level: number) => {
    const iterators = Object.keys(node);
    let hasChildArray = false;
    const returnArray: any[] = [];
    for (const iterator of iterators) {
      const value = node[iterator];
      const type = Object.prototype.toString.call(value);
      if (type === '[object Array]') {
        hasChildArray = true;
      } else {
        returnArray.push(value);
      }
    }
    return {
      expandable: hasChildArray,
      level,
      value: returnArray
    };
  }

  private genFlatTreeControl(): FlatTreeControl<FlatNode> {
    return new FlatTreeControl<FlatNode>(node => node.level, node => node.expandable);
  }

  private geTreeFlattener(): MatTreeFlattener<any, FlatNode> {
    return new MatTreeFlattener(this.transformer, node => node.level, node => node.expandable, node => node.children);
  }

  private genDataSource(treeControl: FlatTreeControl<FlatNode>): MatTreeFlatDataSource<any, FlatNode, FlatNode> {
    return new MatTreeFlatDataSource(treeControl, this.geTreeFlattener());
  }

}
