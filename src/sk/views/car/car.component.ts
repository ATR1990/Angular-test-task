import {ChangeDetectionStrategy, Component, Input, OnDestroy} from '@angular/core'
import {Router} from "@angular/router"
import {Subject} from "rxjs"
import {takeUntil, tap} from "rxjs/operators"

import {MatDialog} from "@angular/material/dialog"
import {MatSnackBar} from "@angular/material/snack-bar"

import {CarInterface} from "@shared/models/car.interface"
import {CarsService} from "@shared/services/cars.service"
import {ConfirmModalComponent} from "@shared/index"

@Component({
  selector: 'sk-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarComponent implements OnDestroy {
  @Input() car!: CarInterface
  dialogRef: any
  private _unsubscribe$ = new Subject()

  constructor(
    private router: Router,
    private carsService: CarsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  editCar(id: number): void {
    this.router?.navigate(['/edit', `${id}`])
  }

  detailedViewCar(id: number): void {
    this.router?.navigate(['/detailed-view', `${id}`])
  }

  private _openDialog(): void {
    this.dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {text: 'Вы действительно хотите удалить машину?', color: 'warn'},
      disableClose: true
    })
  }

  private _deleteCar(id: number): void {
    this.carsService.deleteCar(id)
      .pipe(
        takeUntil(this._unsubscribe$),
        tap(() => this.carsService.refresh$.next())
      )
      .subscribe(
        () => this.dialogRef.close('deleted'),
        () => this.dialogRef.close()
      )
  }

  private _onConfirm(id: number): void {
    this.dialogRef.componentInstance.onConfirm
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(() => this._deleteCar(id))
  }

  private _openSnackBar(): void {
    this.snackBar.open('Успешно удалено', 'Машина', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    })
  }

  private _afterClosed(): void {
    this.dialogRef.afterClosed()
      // .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result: string) => {
        if (result === 'deleted') {
          this._openSnackBar()
        }
      })
  }

  openConfirmModal(id: number): void {
    this._openDialog()
    this._onConfirm(id)
    this._afterClosed()
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(true)
    this._unsubscribe$.complete()
  }

}
