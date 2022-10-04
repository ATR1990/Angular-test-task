import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core'
import {Router} from "@angular/router"
import {takeUntil} from "rxjs/operators"
import {Subject} from "rxjs"

import {CarInterface} from "@shared/models/car.interface"
import {CarsService} from "@shared/services/cars.service"


@Component({
  selector: 'sk-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CarsComponent implements OnInit, OnDestroy {
  cars: CarInterface[] = [];
  private _unsubscribe$ = new Subject()

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private carsService: CarsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this._getAllCars()
    this._autoRefresh()
    this._search()
  }

  private _getAllCars(q?: string): void {
    this.carsService.getAllCars(q)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((cars: CarInterface[]) => {
        this.cars = cars.reverse()
        this.changeDetectorRef.markForCheck()
      })
  }

  private _autoRefresh(): void {
    this.carsService.refresh$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(() => this._getAllCars())
  }

  private _search(): void {
    this.carsService.search$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(data => this._getAllCars(data))
  }

  trackByFn(index: number, car: CarInterface): number {
    return car.id
  }

  createCar(): void {
    this.router?.navigate(['/create'])
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(true)
    this._unsubscribe$.complete()
  }

}
