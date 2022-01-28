import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";

import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatExpansionModule} from "@angular/material/expansion";

import {AppComponent} from './app.component';
import {CarsComponent} from '@views/cars/cars.component';
import {CarComponent} from '@views/car/car.component';
import {CarEditComponent} from '@views/car-edit/car-edit.component';
import {CarCreateComponent, CustomDateFormat2} from '@views/car-create/car-create.component';
import {CarDetailedComponent} from '@views/car-detailed/car-detailed.component';
import {ConfirmModalComponent} from '@views/confirm-modal/confirm-modal.component';
import {SearchComponent} from '@views/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    CarComponent,
    CarCreateComponent,
    CustomDateFormat2,
    CarEditComponent,
    CarDetailedComponent,
    ConfirmModalComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ru-Ru'},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
