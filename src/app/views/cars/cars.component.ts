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
  private unsubscribe$ = new Subject()

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private carsService: CarsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getAllCars()
    this.autoRefresh()
    this.search()
  }

  private getAllCars(q?: string): void {
    this.carsService.getAllCars(q)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((cars: CarInterface[]) => {
        this.cars = cars.reverse()
        this.changeDetectorRef.markForCheck()
      })
  }

  private autoRefresh(): void {
    this.carsService.refresh$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.getAllCars())
  }

  private search(): void {
    this.carsService.search$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => this.getAllCars(data))
  }

  trackByFn(index: number, car: CarInterface): number {
    return car.id
  }

  createCar(): void {
    this.router?.navigate(['/create'])
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

}
