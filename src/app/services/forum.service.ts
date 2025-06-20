import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { ITopicsAPIResponse } from '../interfaces/IForumResponse';
@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private readonly http: HttpClient) { }
  
  getTopicsAndSubtopics():Observable<ITopicsAPIResponse[]>{
    return this.http.get<ITopicsAPIResponse[]>(`${environment.apiUrl}/forum/topics/`)
    .pipe(
      tap(response => {
        console.log('Fetched topics:', response);
      },      
    ),      
    );
  }
}