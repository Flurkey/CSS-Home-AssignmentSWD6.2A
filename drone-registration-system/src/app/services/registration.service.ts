import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Owner } from "../dto/registration.dto";

@Injectable()
export class RegistrationService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) {}

  getOwners(token: string): Observable<Owner[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get<Owner[]>(this.apiUrl + '/registrations', { headers });
  }

  addDrone(token: string, droneData: any): Observable<any> {
    const headers = this.createHeaders(token);

    return this.httpClient.post(this.apiUrl + "/registrations", droneData, { headers })
  }

  updateDrone(token: string, id: number, droneData: any): any {
    const headers = this.createHeaders(token);

    return this.httpClient.patch(this.apiUrl + "/registrations/" + id, droneData, { headers })
  }

  deleteByID(token: string, id: number): any {
    const headers = this.createHeaders(token);

    return this.httpClient.delete<Owner>(this.apiUrl + '/registrations/' + id, { headers })
  }

  getDroneByID(token: string, id: number): Observable<Owner> {
    const headers = this.createHeaders(token);
    
    return this.httpClient.get<Owner>(this.apiUrl + '/registrations/' + id, { headers });
  }

  authenticate(email: string, password: string): Observable<any> {
    const loginEndpoint = this.apiUrl + '/auth';

    const credentials = {
      email: email,
      password: password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post(loginEndpoint, credentials, { headers });
  }

  private createHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}