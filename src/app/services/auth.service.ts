import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { IRegisterUser } from '../interfaces/IRegisterUser';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  get isAuthenticated(): boolean {
    // TODO: Implement authentication check
    return true
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
  
  register(data: IRegisterUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, data, this.httpOptions).pipe(catchError(this.handleError))
  }


}
