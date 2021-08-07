import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GatewayMap, GatewayMapper as Gateway } from './Gateways';

@Injectable({
  providedIn: 'root'
})
export class GatewayServiceService {
  
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

  url = 'https://localhost:44320/api/Gateways/';

  constructor(private http: HttpClient) { }

  getGatewayList(): Observable<Gateway[]> {
    var result =this.http.get<Gateway[]>(this.url + 'GetListOfGateways').pipe(catchError(this.handleError));
    return result;
  }
  GetGatewayDevicesById(id:number){
    this.http.get(this.url + 'GetDevicesByGatewayId?id='+id)
    .subscribe(Response => {
      return Response;
    });
  }
  public sendGetRequest(){
    return this.http.get('')
    .pipe(catchError(this.handleError));
  }
  postGatewayData(gatewayData: Gateway): Observable<Gateway> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<Gateway>(this.url + 'PostGateway', gatewayData, httpHeaders).pipe(catchError(this.handleError));;
  }
  updateGateway(gateway: GatewayMap): Observable<Gateway> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<Gateway>(this.url + 'EditGateway?id=' + gateway.id, gateway, httpHeaders).pipe(catchError(this.handleError));;
  }
  deleteGatewayById(id: number): Observable<number> {
    return this.http.post<number>(this.url + 'DeleteGateway?id=' + id, null);
  }
  getGatewayDetailsById(id: number): Observable<GatewayMap> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.get<GatewayMap>(this.url + 'GetGateway?id=' + id,httpHeaders).pipe(catchError(this.handleError));;
  }
}
