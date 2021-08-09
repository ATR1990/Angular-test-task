import {Component, Inject, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {

  public onConfirm = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

}
