import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from "@angular/router"
import {takeUntil} from "rxjs/operators"
import {Subject} from "rxjs"

import {CarInterface} from "@shared/models/car.interface"
import {CarsService} from "@shared/services/cars.service"

@Component({
  selector: 'sk-car-detailed',
  templateUrl: './car-detailed.component.html',
  styleUrls: ['./car-detailed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CarDetailedComponent implements OnInit, OnDestroy {
  car!: CarInterface;
  id: any
  private _unsubscribe$ = new Subject()

  constructor(
    private carsService: CarsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this._getCar()
  }

  private _getCar() {
    this.id = this.route.snapshot.params.id;

    if (this.id) {
      this.carsService.getCar(this.id)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((car: CarInterface) => this.car = car)
    }
  }

  goToMainPage() {
    this.router?.navigate(['/'])
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next()
    this._unsubscribe$.complete()
  }

}
