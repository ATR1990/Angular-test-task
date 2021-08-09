import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CarsService} from "../../services/cars.service";
import {DatePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {CarInterface} from "../../types/car.interface";

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})

export class CarEditComponent implements OnInit {
  form!: FormGroup;
  minDate!: Date;
  id: any

  constructor(
    private carsService: CarsService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
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
        Validators.required
      ]),
      Miles_per_Gallon: new FormControl(null, [
        Validators.required
      ]),
      Name: new FormControl('', [
        Validators.required
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

    this.id = this.route.snapshot.params.id;

    if (this.id) {
      this.carsService.getCar(this.id).subscribe((car: CarInterface) => {
        this.form.controls['Acceleration'].setValue(car.Acceleration);
        this.form.controls['Currency'].setValue(car.Currency);
        this.form.controls['Cylinders'].setValue(car.Cylinders);
        this.form.controls['Displacement'].setValue(car.Displacement);
        this.form.controls['Horsepower'].setValue(car.Horsepower);
        this.form.controls['Miles_per_Gallon'].setValue(car.Miles_per_Gallon);
        this.form.controls['Name'].setValue(car.Name);
        this.form.controls['Origin'].setValue(car.Origin);
        this.form.controls['Price'].setValue(car.Price);
        this.form.controls['Weight_in_lbs'].setValue(car.Weight_in_lbs);
        this.form.controls['Year'].setValue(car.Year);
      })
    }
  }

  save() {
    const dto: any = this.form.getRawValue();
    if (dto.Year) {
      dto.Year = this.datePipe.transform(dto.Year, 'yyyy-MM-dd');
    }

    dto.id = +this.id

    this.carsService.editCar(dto).subscribe(
      () => this.router.navigate(['/'])
    );
  }

  goToMainPage() {
    this.router.navigate(['/'])
  }

}
