import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataInterface } from 'src/app/models/data.interface';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {

  datas: DataInterface[];
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get<DataInterface[]>('datas').subscribe(x => {
      this.datas = x;
    });
  }

}
