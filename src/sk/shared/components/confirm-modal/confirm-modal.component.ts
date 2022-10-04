import {Component, Inject, EventEmitter, ChangeDetectionStrategy} from '@angular/core'

import {MAT_DIALOG_DATA} from "@angular/material/dialog"

@Component({
  selector: 'sk-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ConfirmModalComponent {
  onConfirm = new EventEmitter()

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

}
