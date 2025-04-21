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
    this.http.get<IAuthResponse>(`${this.apiUrl}/auth/me/`)
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

  fetchCurrentUser(): Observable<IAuthResponse | null> {
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


  register(data: IRegisterUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register/`, data, this.httpOptions)
  }

  login(username: string, password: string): Observable<any> {
    console.log("login pressed")
    console.log(`Login url: ${this.apiUrl}/auth/login`)
    return this.http.post<IAuthResponse | null>(
      `${this.apiUrl}/auth/login/`,
      {
        "username": username, 
        "password": password
      },
      this.httpOptions
    ).pipe(
        tap((response: IAuthResponse| null) => {
          console.log("recieved response")
          if (response && response.user){

            this.currentUserSubject.next(response.user);
          }
          else{
            console.log("failed auth")
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
