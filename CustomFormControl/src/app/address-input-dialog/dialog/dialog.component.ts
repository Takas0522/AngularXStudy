import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddressModel } from 'src/app/models/my-form-group-model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public fg: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: AddressModel
  ) { }

  ngOnInit() {
    this.fg = this.fb.group({
      zipCode: [this.data.zipCode],
      prefecture: [this.data.prefecture],
      city: [this.data.city]
    });
  }

  submit() {
    this.ref.close(this.fg.value);
  }

}
