import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FlatNode, PresudoTableWithTreeService } from './presudo-table-with-tree.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ptt-presudo-table-with-tree',
  templateUrl: './presudo-table-with-tree.component.html',
  styleUrls: ['./presudo-table-with-tree.component.scss']
})
export class PresudoTableWithTreeComponent<T> implements OnInit {

  @Input()
  set dataSource$(data: Observable<T[]>) {
    this._outputDataSource = data.pipe(
      map(m => {
        return this.service.parseStructure(m);
      })
    );
  }
  @Input() columnNames: string[] = [];

  _outputDataSource!: Observable<any[]>;

  hasChild = (_: number, node: FlatNode) => node.expandable;

  constructor(
    private service: PresudoTableWithTreeService
  ) { }

  ngOnInit(): void {
  }

}
