import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from './utils.service';
import { LoggerService } from './logger.service';
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


  constructor(private readonly router: Router, private  readonly utils: UtilsService, private readonly logger: LoggerService
  ) {
  }

  private showLoadingScreen() { //man i love css
    this.loadingscreenelement = document.getElementById('splash-screen-intermitent'); //im 90% sure angular has a way to do this but im too lazy to look it up
    this.loadingscreenelement.classList.remove("disabled");
    this.loadingscreenelement.classList.add("fade-in")
  }

  private hideLoadingScreen() {
    setTimeout(() => {
      if(!this.keepOn){
        this.loadingscreenelement = document.getElementById('splash-screen-intermitent');
        this.loadingscreenelement.classList.add("fade-out");
        this.loadingscreenelement.classList.remove("fade-in");
      }

    }, 500);
  }

  
  switchWithLoading(routePath: string, scrollToId?: string, duration: number = 3000, scrollToTop: boolean = true, event?: MouseEvent, ) {
    if (event && !event.ctrlKey && !event.metaKey && event.button === 0) {
      event.preventDefault(); // Prevent default navigation
    } 
    
    
    console.log('switchWithLoading', routePath);
    if (!this.enabled) {
      console.log('disabled');
      return;
    }
    
    console.log('scrollToTop', scrollToTop);
    if(scrollToTop){
      this.utils.scrollToTop();
    }

    console.log('showLoadingScreen');
    this.showLoadingScreen(); //we enable loading screen

    setTimeout(() => {
      console.log('navigating to', routePath);
      this.router.navigate([routePath]).then((success) => { //switch to it
        console.log('success', success);
        console.log('navigated to', routePath);

        if (scrollToId || scrollToId === '') { //see if we gotta scroll somewhere
          setTimeout(() => { 
            console.log('scrolling to', scrollToId);
            const element = document.getElementById(scrollToId);
            element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 0); // scroll to shit
        }

        console.log('navigated to', routePath);
      }).catch((error) => {
        
        console.log('error', error);
        this.hideLoadingScreen();
      });
    }, 500); 

    setTimeout(() => {
      this.hideLoadingScreen();
    }, duration); //then hide loading screen 
    
  }
}
