import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Router} from "@angular/router";

import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

// @ts-ignore
import {CarInterface} from "@types/car.interface";
import {CarsService} from "@services/cars.service";
import {ConfirmModalComponent} from "@views/confirm-modal/confirm-modal.component";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarComponent {
  @Input() car!: CarInterface

  constructor(
    private router: Router,
    private carsService: CarsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
  }

  editCar(id: number) {
    this.router.navigate(['/edit', `${id}`])
  }

  detailedViewCar(id: number) {
    this.router.navigate(['/detailed-view', `${id}`])
  }

  openConfirmModal(id: number) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {text: 'Вы действительно хотите удалить машину?', color: 'warn'},
      disableClose: true
    });
    dialogRef.componentInstance.onConfirm.subscribe(() => {
      this.carsService.deleteCar(id).subscribe(() => {
        dialogRef.close('deleted');
      }, error => {
        dialogRef.close();
      });
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'deleted') {
        this.snackBar.open('Успешно удалено', 'Машина', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }
    });
  }

}
