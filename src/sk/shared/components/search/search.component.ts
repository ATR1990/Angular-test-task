import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms"

import {CarsService} from "@shared/services/cars.service"

@Component({
  selector: 'sk-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearchComponent implements OnInit {
  filterForm!: UntypedFormGroup

  constructor(
    private carsService: CarsService,
    private fb: UntypedFormBuilder
  ) {
  }

  ngOnInit(): void {
    this._createForm()
  }

  private _createForm(): void {
    this.filterForm = this.fb.group({
      search: ''
    })
  }

  filterData(): void {
    const data: any = this.filterForm.getRawValue()
    this.carsService.search$.next(data.search)
  }

  resetFilter(): void {
    this.filterForm.reset()
    this.carsService.search$.next('')
  }

}
