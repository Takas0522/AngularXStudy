import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-edit',
  templateUrl: './data-edit.component.html',
  styleUrls: ['./data-edit.component.scss']
})
export class DataEditComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    name: new FormControl(''),
    addDate: new FormControl({ value: null, disabled: true })
  });
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`data/${id}`).subscribe(x => {
      this.formGroup.patchValue(x);
    });
  }

  onSubmit(): void {
    this.http.post('data', this.formGroup.getRawValue()).subscribe(x => {
      this.router.navigate(['list']);
    });
    this.http.post('ddddd', this.formGroup.getRawValue()).subscribe(x => {
      console.log('aaaaaaaaaaaaaaa');
    });
  }

}
