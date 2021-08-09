import {Component, Directive, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {DatePipe} from "@angular/common";
import {CarsService} from "../../services/cars.service";
import {Router} from "@angular/router";

const MY_FORMAT_2 = {
  parse: {
    dateInput: 'dd.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Directive({
  selector: '[dateFormat2]',
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMAT_2},
  ],
})

export class CustomDateFormat2 {
}

@Component({
  selector: 'app-car-create',
  templateUrl: './car-create.component.html',
  styleUrls: ['./car-create.component.css']
})

export class CarCreateComponent implements OnInit {
  form!: FormGroup;
  minDate!: Date;

  constructor(
    private carsService: CarsService,
    private datePipe: DatePipe,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      Acceleration: new FormControl(null, [
        Validators.required
      ]),
      Currency: new FormControl('', [
        Validators.required
      ]),
      Cylinders: new FormControl(null, [
        Validators.required
      ]),
      Displacement: new FormControl(null, [
        Validators.required
      ]),
      Horsepower: new FormControl(null, [
        Validators.required, Validators.min(1)
      ]),
      Miles_per_Gallon: new FormControl(null, [
        Validators.required
      ]),
      Name: new FormControl('', [
        Validators.required, Validators.minLength(3), Validators.maxLength(50)
      ]),
      Origin: new FormControl('', [
        Validators.required
      ]),
      Price: new FormControl(null, [
        Validators.required
      ]),
      Weight_in_lbs: new FormControl(null, [
        Validators.required
      ]),
      Year: new FormControl(null, [
        Validators.required
      ])
    })
  }

  save() {
    const dto: any = this.form.getRawValue();
    if (dto.Year) {
      dto.Year = this.datePipe.transform(dto.Year, 'yyyy-MM-dd');
    }

    this.carsService.createCar(dto).subscribe(
      () => this.router.navigate(['/'])
    );
  }

  getErrorMessage(controlName: string) {
    return this.form.controls[controlName].hasError('required') ? 'Поле обязательно для заполнения' :
      this.form.controls[controlName].hasError('min') ? 'не меньше 1' :
        this.form.controls['Name'].errors?.minlength || this.form.controls['Name'].errors?.maxlength ? 'от 3 до 50 символов' :
          ''
  }

  resetFilter() {
    this.form.reset();
  }

  goToMainPage() {
    this.router.navigate(['/'])
  }
}
