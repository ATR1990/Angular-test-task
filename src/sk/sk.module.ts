import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {HttpClientModule} from "@angular/common/http"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"

import {SkRoutingModule} from "./sk-routing.module"
import {SkComponent} from './sk.component'
import {CarsComponent} from '@views/cars/cars.component'
import {CarComponent} from '@views/car/car.component'
import {CarEditComponent} from '@views/car-edit/car-edit.component'
import {CarCreateComponent} from '@views/car-create/car-create.component'
import {CarDetailedComponent} from '@views/car-detailed/car-detailed.component'
import {SharedModule} from "@shared/index"

@NgModule({
  declarations: [
    SkComponent,
    CarsComponent,
    CarComponent,
    CarCreateComponent,
    CarEditComponent,
    CarDetailedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SkRoutingModule,
    SharedModule
  ],
  bootstrap: [SkComponent]
})
export class SkModule {
}
