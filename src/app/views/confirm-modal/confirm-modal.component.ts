import {Component, Inject, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmModalComponent {

  public onConfirm = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

}
