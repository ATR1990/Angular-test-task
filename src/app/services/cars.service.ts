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
  private url = 'http://localhost:3000/cars'
  private _refresh$ = new Subject<void>()

  constructor(private http: HttpClient) {
  }

  get refresh$() {
    return this._refresh$
  }

  getAllCars(q?: any): Observable<CarInterface[]> {
    return this.http.get<CarInterface[]>(q ? `${this.url}/?q=${q}` : this.url)
  }

  getCar(id: number): Observable<CarInterface> {
    return this.http.get<CarInterface>(`${this.url}/${id}`)
  }

  createCar(dto: CarInterface): Observable<CarInterface> {
    return this.http.post<CarInterface>(this.url, dto)
  }

  editCar(dto: CarInterface): Observable<CarInterface> {
    return this.http.put<CarInterface>(`${this.url}/${dto.id}`, dto)
  }

  deleteCar(id: number): Observable<CarInterface> {
    return this.http
      .delete<CarInterface>(`${this.url}/${id}`)
      .pipe(tap(() => this._refresh$.next()))
  }

}
