import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

import {CarsService} from "@services/cars.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  filterForm!: FormGroup

  constructor(private carsService: CarsService) {
  }

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      search: new FormControl('')
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
