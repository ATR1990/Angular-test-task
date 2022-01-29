import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

// @ts-ignore
import {CarInterface} from "@types/car.interface";
import {CarsService} from "@services/cars.service";

@Component({
  selector: 'app-car-detailed',
  templateUrl: './car-detailed.component.html',
  styleUrls: ['./car-detailed.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarDetailedComponent implements OnInit {
  car!: CarInterface;
  id: any

  constructor(
    private carsService: CarsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;

    if (this.id) {
      this.carsService.getCar(this.id).subscribe((car: CarInterface) => this.car = car)
    }
  }

  goToMainPage() {
    this.router?.navigate(['/'])
  }

}
