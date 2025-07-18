import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from './utils.service';
import { LoggerService, LogLevel } from './logger.service';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class IntermitentLoadingService {
  private loadingscreenelement: HTMLElement | null = null
  private mainBodyElement: HTMLElement | null = null
  //
  // USE THIS FLAG TO KEEP THE INTERMITENT SCREEN ON, IT WONT FADE
  //

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
    this.mainBodyElement =  document.getElementById('super-duper-main-root')

    if (!this.loadingscreenelement || !this.enabled || !this.mainBodyElement){
      this.logger.log(LogLevel.Error, 'Loading screen element not found or loading disabled');
      return;
    }


    this.mainBodyElement.classList.add('main-body-hidden')
    this.logger.log(LogLevel.Info, 'Showing loading screen');
    this.loadingscreenelement.classList.remove("disabled");
    this.loadingscreenelement.classList.add("fade-in");
  }

   hideLoadingScreen() {
    if (!this.enabled) return;
    
    setTimeout(() => {
      if (!this.loadingscreenelement || !this.enabled || !this.mainBodyElement){
        this.logger.log(LogLevel.Error, 'Loading screen element not found or loading disabled');
        return;
      }

      this.mainBodyElement.classList.remove('main-body-hidden')

      this.loadingscreenelement = document.getElementById('splash-screen-intermitent');
      if (this.loadingscreenelement) {
        this.logger.log(LogLevel.Info, 'Hiding loading screen');
        this.loadingscreenelement.classList.add("fade-out");
        this.loadingscreenelement.classList.remove("fade-in");
        this.isLoading.next(false);
      } else {
        this.logger.log(LogLevel.Error, 'Loading screen element not found when trying to hide');
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
    


    this.showLoadingScreen()

    setTimeout(() => {
      this.router.navigate([routePath]).then((_) => { 
        if (scrollToId || scrollToId === '') {
          setTimeout(() => { 
            let scrollOffset = screen.height/100;
            this.utils.scrollToElement(scrollToId, scrollOffset)
          }, 500); 
        }
        else if(scrollToTop){
          setTimeout(() => { 
            this.utils.scrollToTop();
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
