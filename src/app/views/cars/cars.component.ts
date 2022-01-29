import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core'
import {Router} from "@angular/router"
import {takeUntil} from "rxjs/operators"
import {Subject} from "rxjs"

// @ts-ignore
import {CarInterface} from "@types/car.interface"
import {CarsService} from "@services/cars.service"


@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
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
    this._unsubscribe$.next()
    this._unsubscribe$.complete()
  }

}
