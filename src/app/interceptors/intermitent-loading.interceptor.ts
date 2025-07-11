import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IntermitentLoadingService } from '../services/intermitent-loading.service';



export function intermitentLoadingInterceptor(req:HttpRequest<any>, next:HttpHandlerFn): Observable<HttpEvent<any>>{
  const loadingService = inject(IntermitentLoadingService);

  loadingService.setLoadingTrue()
  console.log("loading interceptor")
  
  return next(req).pipe(
    finalize(() => {
      try {        
          setTimeout(()=>{
            loadingService.setLoadingFalse();
            loadingService.hideLoadingScreen();
          }, 500)
          console.log("hiding loading scrren interceptor")
      } catch (error) {
        loadingService.setLoadingFalse();
        loadingService.hideLoadingScreen();
        console.error("Error hiding loading screen:", error);
      }
    })
  );
}