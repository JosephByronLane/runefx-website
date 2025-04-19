import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { IRegisterUser } from '../interfaces/IRegisterUser';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/IUser';
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

  private handleError(error: any): Observable<never> {
    let errorMessage = 'Something went wrong;'

    if (error.error instanceof ErrorEvent){
      //client side error
      errorMessage = error.error.message;

    }
    else if (error.status){
      switch (error.status){
        case 401:
          errorMessage = 'Unauthorized';
          break;
        case 403:
          errorMessage = 'Forbidden';
          break;
        case 404:
          errorMessage = 'Not Found';
          break;
        case 500:
          errorMessage = 'Internal Server Error';
          break;
        case 400:
          errorMessage = 'Bad Request';
          break;
        default:
          errorMessage = 'An error occurred';
          break;
      }
    }
    console.error("Error: ", errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  //need to implement cookie stuff
  // register(data: IRegisterUser): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/auth/register/`, data, this.httpOptions).pipe(catchError(this.handleError))
  // }

  // login(username: string, password: string): Observable<any> {
  //   return this.http.post<AuthTokens>(
  //     `${this.apiUrl}/auth/login/`,
  //     {username, password},
  //     this.httpOptions
  //   ).pipe(
  //     tap((tokens: AuthTokens) => {
  //       this.setSession(tokens);
  //       this
  //     }),
  //     catchError(this.handleError)
  //   )
  // }


}
