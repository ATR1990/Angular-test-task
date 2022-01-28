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
    this.autoRefresh()
    this.getAllCars()
  }

  autoRefresh() {
    this.carsService.refresh$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.getAllCars())
  }

  getAllCars(q?: any) {
    this.carsService.getAllCars(q)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((cars: CarInterface[]) => {
        this.cars = cars.reverse()
        this.changeDetectorRef.markForCheck()
      })
  }

  trackByFn(index: number, car: CarInterface): number {
    return car.id
  }

  createCar() {
    this.router?.navigate(['/create'])
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

}
