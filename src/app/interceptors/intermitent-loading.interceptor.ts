import { inject  } from '@angular/core';
import {  HttpRequest,  HttpEvent, HttpHandlerFn } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IntermitentLoadingService } from '../services/intermitent-loading.service';
import { InitialLoadingService } from '../services/initial-loading.service';

let requestsPending = 0;

export function intermitentLoadingInterceptor(req:HttpRequest<any>, next:HttpHandlerFn): Observable<HttpEvent<any>>{
  const intermitentLoading = inject(IntermitentLoadingService);
  const initialLoading = inject(InitialLoadingService)

  requestsPending++;

  intermitentLoading.setLoadingTrue()
  initialLoading.setisAPIRequestTrue()
  
  return next(req).pipe(
    finalize(() => {
      try {        

        requestsPending--;

        if (requestsPending<=0){
          setTimeout(()=>{
            intermitentLoading.setLoadingFalse();
            intermitentLoading.hideLoadingScreen();


            initialLoading.setisAPIRequestFalse();
            initialLoading.hideInitialLoadingScreen();

            requestsPending = 0;
          }, 500)
        }

      } catch (error) {
        console.error(error)

        if(requestsPending <= 0 ){
          intermitentLoading.setLoadingFalse();
          intermitentLoading.hideLoadingScreen();
          initialLoading.setisAPIRequestFalse();
          initialLoading.hideInitialLoadingScreen();

          requestsPending = 0;

        }


      }
    })
  );
}