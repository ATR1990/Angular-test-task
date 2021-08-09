import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {CarInterface} from "../types/car.interface";

@Injectable({
  providedIn: 'root'
})

export class CarsService {
  private url = 'http://localhost:3000/cars';

  constructor(private http: HttpClient) {
  }

  getCars(q?: any): Observable<CarInterface[]> {
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
    return this.http.delete<CarInterface>(`${this.url}/${id}`)
  }

}
