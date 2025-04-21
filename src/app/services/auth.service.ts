import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { IRegisterUser } from '../interfaces/IRegisterUser';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/IUser';
import { IAuthResponse } from '../interfaces/IAuthResponse';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = environment.apiUrl;
  
  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  
  constructor(private http: HttpClient, private router: Router) {
      this.isAuthenticated();
   }

   private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
   }

  private isAuthenticated(): void{
    this.http.get<IUser>(`${this.apiUrl}/auth/me/`)
    .pipe(
      catchError(() => of(null))
    )
      .subscribe( user => {
        if (user){
        this.currentUserSubject.next(user);
      } else {
        this.currentUserSubject.next(null);
      }
    })
  }

  register(data: IRegisterUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register/`, data, this.httpOptions)
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<IAuthResponse>(
      `${this.apiUrl}/auth/login/`,
      {username, password},
      this.httpOptions
    ).pipe(
      tap((response: IAuthResponse) => {
        if (response.user){
          this.currentUserSubject.next(response.user);
        }
      })
    )
  }


}
