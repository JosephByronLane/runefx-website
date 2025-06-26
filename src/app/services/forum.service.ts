import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { ISubtopicAPIResponse, ISubtopicDetailAPIResponse, ITopicsAPIResponse } from '../interfaces/IForumResponse';
@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private readonly http: HttpClient) { }
  
  getTopicsAndSubtopics():Observable<ITopicsAPIResponse[]>{
    return this.http.get<ITopicsAPIResponse[]>(`${environment.apiUrl}/forum/topics/`)
    .pipe(
     
    );
  }

  getSingleTopic(topicId: number):Observable<ITopicsAPIResponse>{
    return this.http.get<ITopicsAPIResponse>(`${environment.apiUrl}/forum/topics/${topicId}`)
    .pipe(
     
    );
  }


  getSingleSubtopic(subtopicId: number):Observable<ISubtopicDetailAPIResponse>{
    return this.http.get<ISubtopicDetailAPIResponse>(`${environment.apiUrl}/forum/subtopics/${subtopicId}`)
    .pipe(
     
    );
  }

  truncateUserName(userName: string): string {
    if (userName.length > 13) {
      return userName.slice(0, 10) + '...';
    }
    return userName;
  }
}