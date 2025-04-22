import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { IRegisterUser } from '../interfaces/IRegisterUser';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/IUser';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { ProfileSidebarComponent } from '../components/profile-sidebar/profile-sidebar.component';
import { LoggerService, LogLevel } from './logger.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = environment.apiUrl;
  
  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  
  constructor(private http: HttpClient, private router: Router, public logginService:LoggerService) {
    this.isAuthenticated().subscribe();
  }  
  
  get CurrentUserValue() : Observable<IUser | null>{
    return this.currentUserSubject.asObservable();
  }

  get isAuthenticatedValue(): Observable<boolean>{
    return this.isAuthenticatedSubject.asObservable();
  }

  private httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
  }

  private isAuthenticated(): Observable<IAuthResponse>{

    this.logginService.log(LogLevel.Debug, "isAuthenticated - Starting authentication check");


    return this.http.get<IAuthResponse>(`${this.apiUrl}/auth/me/`,
      this.httpOptions
    )
    .pipe(
      tap(
        response => {
          this.logginService.log(LogLevel.Debug, " IsAuthenticated > tap - Http response recieved")
        
          this.currentUserSubject.next(response.user);
          this.isAuthenticatedSubject.next(true)
          console.log(response.user)
        }
      ),
      catchError(
        (error) =>{
          this.logginService.log(LogLevel.Error, `IsAuthenticated > CatchError - ${error.message}. Attempting to refresh tokens...`)

          
          this.refreshToken()
            .pipe(
              catchError((error) =>{
              this.logginService.log(LogLevel.Error, "IsAuthenticated > CatchError > refreshToken -  Failed to refresh.")

              this.currentUserSubject.next(null);
              this.isAuthenticatedSubject.next(false)
              return of(error)
              })
            ).subscribe()

          this.currentUserSubject.next(null);
          this.isAuthenticatedSubject.next(false)
          return of(error)
        }
      )
    )  
  }

  refreshToken() : Observable<IAuthResponse>{
    this.logginService.log(LogLevel.Debug, "refreshToken - Attempting to refresh tokens...")
    return this.http.post<IAuthResponse>(
      `${this.apiUrl}/auth/login/refresh/`,
      {},
      this.httpOptions
    )
    .pipe(
      tap(
        _ =>{
          this.logginService.log(LogLevel.Debug, "refreshToken - Tokens refreshed successfully! Attempting to re-auth")

          this.isAuthenticated().subscribe()

        }
      ),
      catchError(error =>{
        this.logginService.log(LogLevel.Debug, "refreshToken - Refreshing failed.")

        this.isAuthenticatedSubject.next(false)
        this.currentUserSubject.next(null)
        return throwError(()=> error)
      })
    )
  }

  register(data: IRegisterUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register/`, data, this.httpOptions)
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<IAuthResponse | null>(
      `${this.apiUrl}/auth/login/`,
      {
        "username": username, 
        "password": password
      },
      this.httpOptions
    ).pipe(
        tap((response: IAuthResponse| null) => {
          if (response){
            this.logginService.log(LogLevel.Debug, "login - User logged in correctly")
            this.isAuthenticatedSubject.next(true)
            this.currentUserSubject.next(response.user)
          }
        },
      ),
      catchError((error) => {
        this.logginService.log(LogLevel.Error,  `${error}`)
        throw error;
      })
    )    
  }
  

  logout(){
    console.log("logged out")
  }

}
