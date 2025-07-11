import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IntermitentLoadingService } from '../services/intermitent-loading.service';
import { InitialLoadingService } from '../services/initial-loading.service';



export function intermitentLoadingInterceptor(req:HttpRequest<any>, next:HttpHandlerFn): Observable<HttpEvent<any>>{
  const intermitentLoading = inject(IntermitentLoadingService);
  const initialLoading = inject(InitialLoadingService)

  intermitentLoading.setLoadingTrue()
  initialLoading.setisAPIRequestTrue()
  console.log("loading interceptor")
  
  return next(req).pipe(
    finalize(() => {
      try {        
          setTimeout(()=>{
            intermitentLoading.setLoadingFalse();
            intermitentLoading.hideLoadingScreen();
            initialLoading.setisAPIRequestFalse();
            initialLoading.hideInitialLoadingScreen();
          }, 500)
          console.log("hiding loading scrren interceptor")
      } catch (error) {
        intermitentLoading.setLoadingFalse();
        intermitentLoading.hideLoadingScreen();
        initialLoading.setisAPIRequestFalse();
        initialLoading.hideInitialLoadingScreen();
        console.error("Error hiding loading screen:", error);
      }
    })
  );
}