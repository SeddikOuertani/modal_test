import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MockCarService {

  baseCarPicUrl = "http://localhost:4000/api/carPics" 
  baseCarUrl = "http://localhost:4000/api/cars";
  headers = {"Content-Type" : "application/json"}

  constructor(private http : HttpClient) { }

  getAll(): Observable<Car[]> {
    return this.http.get<Car[]>(this.baseCarUrl);
  }

  getCar(id: any): Observable<any> {
    return this.http.get(`${this.baseCarUrl}/read/${id}`);
  }

  addCar(data: any): Observable<any> {
    return this.http.post(`${this.baseCarUrl}/create`, data);
  }

  deleteCar(id : any): Observable<any>{
    return this.http.delete(`${this.baseCarUrl}/delete/${id}`);
  }

  updateCar(data: Car): Observable<any>{
    return this.http.put(`${this.baseCarUrl}/update/${data.getId()}`,data);
  }

  addCarPic(data : any, carId : any) : Observable<any>{
    return this.http.post(`${this.baseCarPicUrl}/add/${carId}`, data);
  }

  getCarPics(carId : any) : Observable<any>{
    return this.http.get(`${this.baseCarPicUrl}/${carId}`);
  }

  deleteCarPic(picId : any) : Observable<any> {
    return this.http.delete(`${this.baseCarPicUrl}/delete/${picId}`);
  }

}