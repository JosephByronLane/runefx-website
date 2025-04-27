import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { IRegisterUser } from '../interfaces/IRegisterUser';
import { BehaviorSubject, catchError, Observable, of, Subscribable, tap, throwError } from 'rxjs';
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
  
  private isProfileSidebarOpen = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient, private router: Router, public logginService:LoggerService) {
    this.isAuthenticated().subscribe();
  }  
  
  get CurrentUserValue() : Observable<IUser | null>{
    return this.currentUserSubject.asObservable();
  }

  get isAuthenticatedValue(): Observable<boolean>{
    return this.isAuthenticatedSubject.asObservable();
  }

  get isSidebarOpenValue() : Observable<boolean>{
    return this.isProfileSidebarOpen.asObservable()
  }

  public toggleProfileSidebar(){
    this.logginService.log(LogLevel.Debug, " openProfileSidebar - toggled profile sidebar")
    this.isProfileSidebarOpen.next(!this.isProfileSidebarOpen.value);
  }

  public openProfileSidebar(){
    this.logginService.log(LogLevel.Debug, " openProfileSidebar - Opened profile sidebar")
    this.isProfileSidebarOpen.next(true);
  }

  public closeProfileSidebar(){
    this.logginService.log(LogLevel.Debug, " closeProfileSidebar - Closed profile sidebar")
    this.isProfileSidebarOpen.next(false);
  }


  private isAuthenticated(): Observable<IAuthResponse>{

    this.logginService.log(LogLevel.Debug, "isAuthenticated - Starting authentication check");


    return this.http.get<IAuthResponse>(`${this.apiUrl}/auth/me/`
    )
    .pipe(
      tap(
        response => {        
          this.currentUserSubject.next(response.user);
          this.isAuthenticatedSubject.next(true)
          this.logginService.log(LogLevel.Debug, ` IsAuthenticated > Authenticated as ${this.currentUserSubject.value}`)

        }
      ),
      catchError(
        (error) =>{
          this.logginService.log(LogLevel.Error, `IsAuthenticated > CatchError - ${error.message}. Attempting to refresh tokens...`)
          
          this.refreshToken()
            .pipe(
              catchError((error) =>{
              this.logginService.log(LogLevel.Error, "IsAuthenticated > CatchError > refreshToken -  Failed to refresh.")

              this.unsetValues()
              return of(error)
              })
            ).subscribe()

            this.unsetValues()
          return of(error)
        }
      )
    )  
  }

  unsetValues(){
    this.logginService.log(LogLevel.Debug, "unsetValues - Unsetting values...")
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false)
  }

  refreshToken() : Observable<IAuthResponse>{
    this.logginService.log(LogLevel.Debug, "refreshToken - Attempting to refresh tokens...")
    return this.http.post<IAuthResponse>(
      `${this.apiUrl}/auth/login/refresh/`,
      {}
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

        this.unsetValues()
        return throwError(()=> error)
      })
    )
  }

  register(data: IRegisterUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register/`, data)
  }

  login(username: string, password: string): Subscribable<IAuthResponse | null> {
    this.logginService.log(LogLevel.Debug, "login - Attempting login")
    return this.http.post<IAuthResponse | null>(
      `${this.apiUrl}/auth/login/`,
      {
        "username": username, 
        "password": password
      }
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
        this.logginService.log(LogLevel.Error,  `login - ${error}`)
        throw error;
      })
    )
  }
  

  logout():void{
    this.logginService.log(LogLevel.Debug, "logout - Attempting logout")

    this.http.post<IAuthResponse>(`${this.apiUrl}/auth/logout/`,
      {}
    )
    .pipe(
      tap(
        (_) =>{
          this.unsetValues()
        }
      ),    
      catchError(
        (error) =>{
          this.logginService.log(LogLevel.Error,  `logout - ${error.message}`)
          this.unsetValues()
          throw error;
        }
      ) 
    ).subscribe()
  }
}
