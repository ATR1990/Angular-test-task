import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";

// @ts-ignore
import {CarInterface} from "@types/car.interface";
import {CarsService} from "@services/cars.service";

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CarEditComponent implements OnInit {
  form!: FormGroup;
  minDate!: Date;
  id: any

  constructor(
    private carsService: CarsService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this._createForm()

    this.id = this.route.snapshot.params.id

    if (this.id) {
      this.carsService.getCar(this.id).subscribe((car: CarInterface) => {
        this._setValues(car)
      })
    }
  }

  private _createForm(): void {
    this.form = this.fb.group({
      Acceleration: [null, [ Validators.required ]],
      Currency: ['', [ Validators.required ]],
      Cylinders: [null, [ Validators.required ]],
      Displacement: [null, [ Validators.required ]],
      Horsepower: [null, [ Validators.required ]],
      Miles_per_Gallon: [null, [ Validators.required ]],
      Name: ['', [ Validators.required ]],
      Origin: ['', [ Validators.required ]],
      Price: [null, [ Validators.required ]],
      Weight_in_lbs: [null, [ Validators.required ]],
      Year: [null, [ Validators.required ]]
    })
  }

  private _setValues(car: CarInterface): void {
    const { Acceleration, Currency, Cylinders, Displacement, Horsepower, Miles_per_Gallon, Name, Origin, Price, Weight_in_lbs, Year } = car

    this.form.controls['Acceleration'].setValue(Acceleration)
    this.form.controls['Currency'].setValue(Currency)
    this.form.controls['Cylinders'].setValue(Cylinders)
    this.form.controls['Displacement'].setValue(Displacement)
    this.form.controls['Horsepower'].setValue(Horsepower)
    this.form.controls['Miles_per_Gallon'].setValue(Miles_per_Gallon)
    this.form.controls['Name'].setValue(Name)
    this.form.controls['Origin'].setValue(Origin)
    this.form.controls['Price'].setValue(Price)
    this.form.controls['Weight_in_lbs'].setValue(Weight_in_lbs)
    this.form.controls['Year'].setValue(Year)
  }

  save(): void {
    const dto: any = this.form.getRawValue()
    if (dto.Year) {
      dto.Year = this.datePipe.transform(dto.Year, 'yyyy-MM-dd')
    }

    dto.id = +this.id

    this.carsService.editCar(dto).subscribe(
      () => this.router.navigate(['/'])
    )
  }

  goToMainPage(): void {
    this.router?.navigate(['/'])
  }

}
