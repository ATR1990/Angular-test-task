import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {CarsService} from "../../services/cars.service";
import {CarInterface} from "../../types/car.interface";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})

export class CarsComponent implements OnInit {
  cars: CarInterface[] = [];

  constructor(
    private carsService: CarsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getCars()
  }

  getCars(q?: any) {
    this.carsService.getCars(q).subscribe(
      (cars: CarInterface[]) => this.cars = cars.reverse()
    );
  }

  createCar() {
    this.router.navigate(['/create'])
  }

}
