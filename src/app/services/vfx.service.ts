import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { IPostAPIResponse, ISubtopicAPIResponse, ISubtopicDetailAPIResponse, ITopicsAPIResponse } from '../interfaces/IForumResponse';
import { IReleaseAPIResponse, IReleaseDetailAPIResponse } from '../interfaces/IReleaseResponse';
import { IVFXItem } from '../interfaces/IVFXItem';
@Injectable({
  providedIn: 'root'
})
export class  VfxService{

  constructor(private readonly http: HttpClient) { }
  
  getShows(): Observable<IVFXItem[]> {
    return this.http.get<IVFXItem[]>(`${environment.apiUrl}/vfx/`);
  }

  getSingleShow(id: number): Observable<IVFXItem> {
    return this.http.get<IVFXItem>(`${environment.apiUrl}/vfx/${id}/`);
  }
}   