import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { IPostAPIResponse, ISubtopicAPIResponse, ISubtopicDetailAPIResponse, ITopicsAPIResponse } from '../interfaces/IForumResponse';
import { IReleaseAPIResponse, IReleaseDetailAPIResponse } from '../interfaces/IReleaseResponse';
@Injectable({
  providedIn: 'root'
})
export class ReleasesService {

  constructor(private readonly http: HttpClient) { }
  
  getReleases(): Observable<IReleaseAPIResponse[]> {
    return this.http.get<IReleaseAPIResponse[]>(`${environment.apiUrl}/releases/`);
  }

  getSingleRelease(id: number): Observable<IReleaseDetailAPIResponse> {
    return this.http.get<IReleaseDetailAPIResponse>(`${environment.apiUrl}/releases/${id}/`);
  }
}   