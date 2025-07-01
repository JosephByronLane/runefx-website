import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { IPostAPIResponse, ISubtopicAPIResponse, ISubtopicDetailAPIResponse, ITopicsAPIResponse } from '../interfaces/IForumResponse';
@Injectable({
  providedIn: 'root'
})
export class ReleasesService {

  constructor(private readonly http: HttpClient) { }
  
    
}