import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

export let browserRefresh = false;

@Injectable({
  providedIn: 'root'
})
export class InitialLoadingService {



  //
  //
  // IF YOURE LOOKING TO DISABLE THE LOADING SCREEN GO INTO APP.COMPONENT.TS
  //
  //
  //


  
  //we add the class of .fade-out so that it begins fading out.
  //who would of thought, eh?
  hideInitialLoadingScreen(): void {
    const element = document.getElementById('splash-screen-initial');
    const logo = document.getElementById('splash-logo-initial');

    if (element && logo) {
      element.classList.add('fade-out');
      logo.classList.add('fade-out-tl');

      setTimeout(() => {
        element.classList.add('disabled');
        element.classList.remove('fade-out');

        logo.classList.add('disabled');
        logo.classList.remove('fade-out-tl');
      }, 1000); 
    }
    setTimeout(()=>{
      element?.classList.add("disabled")    
    }, 1000)
  }



  //unhides the thingy by removing the disabled class, and the whole animaiton plays
  showInitialLoadingScreen(path: string, refreshed:boolean):void{
    if(refreshed){
      const element = document.getElementById('splash-screen-initial');
      element?.classList.remove("disabled")  
      setTimeout(()=>{
        this.hideInitialLoadingScreen()
      }, 2000)
    }
  }

 

  private _browserRefresh = new BehaviorSubject<boolean>(false);

  public browserRefresh$ = this._browserRefresh.asObservable();
  private subscription: Subscription;


  constructor(private router: Router) {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
             this._browserRefresh.next(!this.router.navigated);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
