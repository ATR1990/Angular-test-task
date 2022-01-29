import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup} from "@angular/forms"

import {CarsService} from "@services/cars.service"

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  filterForm!: FormGroup

  constructor(
    private carsService: CarsService,
    private fb: FormBuilder
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
    this.carsService.search$.next()
  }

}
