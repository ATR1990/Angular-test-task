import {Injectable} from '@angular/core'
import {HttpClient} from "@angular/common/http"
import {Observable, Subject} from "rxjs"
import {tap} from "rxjs/operators"

// @ts-ignore
import {CarInterface} from "@types/car.interface"

@Injectable({
  providedIn: 'root'
})

export class CarsService {
  private baseUrl = 'http://localhost:3000/cars'
  private _refresh$ = new Subject<void>()
  search$ = new Subject<string>()

  constructor(private http: HttpClient) {
  }

  get refresh$(): Subject<void> {
    return this._refresh$
  }

  getAllCars(q?: any): Observable<CarInterface[]> {
    let url = q ? `${this.baseUrl}/?q=${q}` : this.baseUrl
    return this.http.get<CarInterface[]>(url)
  }

  getCar(id: number): Observable<CarInterface> {
    return this.http.get<CarInterface>(`${this.baseUrl}/${id}`)
  }

  createCar(dto: CarInterface): Observable<CarInterface> {
    return this.http.post<CarInterface>(this.baseUrl, dto)
  }

  editCar(dto: CarInterface): Observable<CarInterface> {
    return this.http.put<CarInterface>(`${this.baseUrl}/${dto.id}`, dto)
  }

  deleteCar(id: number): Observable<CarInterface> {
    return this.http
      .delete<CarInterface>(`${this.baseUrl}/${id}`)
      .pipe(tap(() => this._refresh$.next()))
  }

}
