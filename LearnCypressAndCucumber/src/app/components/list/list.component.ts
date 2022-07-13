import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataInterface, DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  data$!: Observable<DataInterface[]>;
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.data$ = this.dataService.data$;
  }

}
