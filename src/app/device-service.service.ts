import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { DeviceMap as Device } from './Devices';

@Injectable({
  providedIn: 'root'
})
export class DeviceServiceService {
  
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  url = 'https://localhost:44320/api/Devices/';

  constructor(private http: HttpClient) { }
  getDeviceList(): Observable<Device[]> {
    var result =this.http.get<Device[]>(this.url + 'GetListOfDevices').pipe(catchError(this.handleError));
    return result;
  }
  postDeviceData(DeviceData: Device): Observable<Device> {
    debugger;
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<Device>(this.url + 'PostDevice', DeviceData, httpHeaders).pipe(catchError(this.handleError));
  }
  updateDevice(Device: Device): Observable<Device> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<Device>(this.url + 'EditDevice?id=' + Device.id, Device, httpHeaders).pipe(catchError(this.handleError));
  }
  deleteDeviceById(id: number): Observable<number> {
    return this.http.post<number>(this.url + 'DeleteDevice?id=' + id, null).pipe(catchError(this.handleError));
  }
  getDeviceDetailsById(id: number): Observable<Device> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.get<Device>(this.url + 'GetDevice?id=' + id,httpHeaders).pipe(catchError(this.handleError));
  }
}
