import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from './utils.service';
import { LoggerService, LogLevel } from './logger.service';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class IntermitentLoadingService {
  private loadingscreenelement: any

  //
  // USE THIS FLAG TO KEEP THE INTERMITENT SCREEN ON, IT WONT FADE
  //

  private readonly keepOn:boolean = false; //keeps the loading screen on definetively, ej it never goes away
  private readonly enabled:boolean=true; //disables the loading screen, ej switching without the loading screen appearing


  private isLoading = new BehaviorSubject<boolean>(false);

  loading$ = this.isLoading.asObservable();

  constructor(private readonly router: Router, private  readonly utils: UtilsService, private readonly logger: LoggerService
  ) {
  }

  setLoadingFalse (){
    this.isLoading.next(false);   

  }

  setLoadingTrue(){
    this.isLoading.next(true)
  }

   showLoadingScreen() { 
    this.loadingscreenelement = document.getElementById('splash-screen-intermitent'); 
    if (!this.loadingscreenelement || !this.enabled){
      this.logger.log(LogLevel.Error, 'Loading screen element not found or loading disabled');
      return;
    }
    this.logger.log(LogLevel.Info, 'Showing loading screen');
    this.loadingscreenelement.classList.remove("disabled");
    this.loadingscreenelement.classList.add("fade-in");
  }

   hideLoadingScreen() {
    if (!this.enabled) return;
    
    setTimeout(() => {
      if(!this.keepOn){
        this.loadingscreenelement = document.getElementById('splash-screen-intermitent');
        if (this.loadingscreenelement) {
          this.logger.log(LogLevel.Info, 'Hiding loading screen');
          this.loadingscreenelement.classList.add("fade-out");
          this.loadingscreenelement.classList.remove("fade-in");
          this.isLoading.next(false);
        } else {
          this.logger.log(LogLevel.Error, 'Loading screen element not found when trying to hide');
        }
      }
    }, 500);
  }

  
  switchWithLoading(routePath?: string, scrollToId?: string, duration: number = 3000, scrollToTop: boolean = true, event?: MouseEvent, ) {
    if (event && !event.ctrlKey && !event.metaKey && event.button === 0) {
      event.preventDefault();
    }     

    if (!this.enabled) {
      return;
    }

    
    if(scrollToTop){
      this.utils.scrollToTop();
    }
    this.showLoadingScreen()

    setTimeout(() => {
      this.router.navigate([routePath]).then((_) => { 
        if (scrollToId || scrollToId === '') {
          setTimeout(() => { 
            const element = document.getElementById(scrollToId);
            element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 500); 
        }

      }).catch((error) => {
        console.error("error in intermitent setvice", error)
        this.hideLoadingScreen();
        this.setLoadingFalse();

      });
    }, 200);

    setTimeout(()=>{
      if(!this.isLoading.getValue()){
        setTimeout(()=>{
          this.hideLoadingScreen()      
        },1500)
      }
    },500)



    
     
  }
}
