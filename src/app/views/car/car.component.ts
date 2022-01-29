import {ChangeDetectionStrategy, Component, Input, OnDestroy} from '@angular/core'
import {Router} from "@angular/router"
import {Subject} from "rxjs"
import {takeUntil} from "rxjs/operators"

import {MatDialog} from "@angular/material/dialog"
import {MatSnackBar} from "@angular/material/snack-bar"

// @ts-ignore
import {CarInterface} from "@types/car.interface"
import {CarsService} from "@services/cars.service"
import {ConfirmModalComponent} from "@views/confirm-modal/confirm-modal.component"

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarComponent implements OnDestroy {
  @Input() car!: CarInterface
  dialogRef: any
  private unsubscribe$ = new Subject()

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

  private _deleteCar(id: number): void {
    this.carsService.deleteCar(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        () => this.dialogRef.close('deleted'),
        () => this.dialogRef.close()
      )
  }

  private _openSnackBar(): void {
    this.snackBar.open('Успешно удалено', 'Машина', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    })
  }

  openConfirmModal(id: number): void {
    this.dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {text: 'Вы действительно хотите удалить машину?', color: 'warn'},
      disableClose: true
    })

    this.dialogRef.componentInstance.onConfirm
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this._deleteCar(id))

    this.dialogRef.afterClosed()
      // .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result: string) => {
        if (result === 'deleted') {
          this._openSnackBar()
        }
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

}
