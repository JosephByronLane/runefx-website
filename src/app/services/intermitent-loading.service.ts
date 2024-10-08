import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IntermitentLoadingService {
  private loadingscreenelement: any

  //
  // USE THIS FLAG TO KEEP THE INTERMITENT SCREEN ON, IT WONT FADE
  //

  private keepOn:boolean = false;
  private enabled:boolean=true;
  constructor(private router: Router) {
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

  
  switchWithLoading(routePath: string, scrollToId?: string, duration: number = 3000) {
    if(this.enabled){
      this.showLoadingScreen(); //we enable loading screen
      setTimeout(() => {
        this.router.navigate([routePath]).then(() => { //switch to it
          if (scrollToId) { //see if we gotta scroll somewhere
            setTimeout(() => { 
              const element = document.getElementById(scrollToId);
              element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 0); // scroll to shit
          }
        });
      }, 500); 
  
      setTimeout(() => {
        this.hideLoadingScreen();
      }, duration); //then hide loading screen 
  
    }
  }
}
