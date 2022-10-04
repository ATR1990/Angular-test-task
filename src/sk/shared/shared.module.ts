import {NgModule} from "@angular/core"
import {ReactiveFormsModule} from "@angular/forms"

import {
  ConfirmModalComponent,
  SearchComponent,
  DateFormatDirective,
  MaterialModule
} from "."

const sharedComponents = [
  SearchComponent,
  ConfirmModalComponent,
  DateFormatDirective
]

@NgModule({
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    ...sharedComponents
  ],
  declarations: [
    ...sharedComponents
  ]
})

export class SharedModule {}
