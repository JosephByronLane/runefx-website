import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { IRegisterUser } from '../interfaces/IRegisterUser';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/IUser';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { ProfileSidebarComponent } from '../components/profile-sidebar/profile-sidebar.component';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = environment.apiUrl;
  
  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  
  private currentUser$ = this.currentUserSubject.asObservable();
  private isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  
  constructor(private http: HttpClient, private router: Router, ) {
    this.isAuthenticated();
  }  
  
  get CurrentUserValue() : IUser | null{
    return this.currentUserSubject.value
  }

  get isAuthenticatedValue(): boolean{
    return this.isAuthenticatedSubject.value;
  }

  private httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
  }

  private isAuthenticated(): void{
    this.http.get<IAuthResponse>(`${this.apiUrl}/auth/me/`,
      this.httpOptions
    )
    .pipe(
      catchError(() => of(null))
    )
      .subscribe( user => {
        if (user){
        this.currentUserSubject.next(user?.user);
      } else {
        this.currentUserSubject.next(null);
      }
    })
  }

  fetchCurrentUserData(): Observable<IAuthResponse | null> {
      return this.http.get<IAuthResponse | null>(`${this.apiUrl}/auth/me`,
        this.httpOptions
      )
      .pipe(
        tap(
          user => {
            if (!user){
              this.logout();
              return
            }
            this.currentUserSubject.next(user?.user)
          }
        ),
      )
  }

  isAuth(): void{
    this.fetchCurrentUserData().subscribe({
      next: () => {
        this.isAuthenticatedSubject.next(true)
      },
      error: () =>{
        this.refreshToken().subscribe({
          next: () =>{
            this.fetchCurrentUserData().subscribe()
          },
          error:() =>{
            this.isAuthenticatedSubject.next(false)
            this.currentUserSubject.next(null)
          }
        })
      }
    })
  }

  refreshToken() : Observable<boolean>{
    return this.http.post<boolean>(
      `${this.apiUrl}/auth/login/refresh/`,
      {},
      this.httpOptions
    )
    .pipe(
      catchError(error =>{
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
            this.isAuthenticatedSubject.next(true)
            this.currentUserSubject.next(response.user)
          }
        },
      ),
      catchError((error) => {
        console.log(error)
        throw error;
      })
    )    
  }
  

  logout(){
    console.log("logged out")
  }

}
