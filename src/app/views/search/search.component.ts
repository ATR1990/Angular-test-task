import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  filterForm!: FormGroup;
  @Output() filter = new EventEmitter()

  constructor() {
  }

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      search: new FormControl(null)
    })
  }

  filterData() {
    const data: any = this.filterForm.getRawValue();
    this.filter.emit(Object.values(data))
  }

  resetFilter() {
    this.filterForm.reset();
    this.filter.emit()
  }

}
