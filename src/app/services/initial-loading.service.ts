import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

export let browserRefresh = false;

@Injectable({
  providedIn: 'root'
})
export class InitialLoadingService {
  //we add the class of .fade-out so that it begins fading out.
  //who would of thought, eh?
  startFadeOut(): void {
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
  }

  //disables it by adding the disabled class
  //said class must be in the css of said component
  disableLoadingScreen():void{
    const element = document.getElementById('splash-screen-initial');
    element?.classList.add("disabled")
    
  }

  //unhides the thingy by removing the disabled class, and the whole animaiton plays
  startLoadingScreen(path: string, refreshed:boolean):void{
    if(this.durations[path]  === undefined){
      this.durations[path] = 1000;
    }
    if(refreshed){
      const element = document.getElementById('splash-screen-initial');
      element?.classList.remove("disabled")  
      setTimeout(()=>{
        this.startFadeOut()
        setTimeout(()=>{
          this.disableLoadingScreen()
        }, 1000)
      }, this.durations[path])
    }
  }

  //ah fuck i forgot i still gotta implement this
  //implemented, lets goooo
  private durations:{[key: string]: number } = {
    '':7000,
    'vfx': 2000,
    'render': 4000,
    'try-buy':7000,
    'about':2000,
    '404':1000,
  };

  
  //a behaviour state is basically a broadcaster for subscribers
  //whenever something subscribes to it it immediatly recieves the current value of it
  private _browserRefresh = new BehaviorSubject<boolean>(false);
  //
  //we encapsulate it so no dumb fuck can cast an update or some shit
  public browserRefresh = this._browserRefresh.asObservable();
  private subscription: Subscription;


  constructor(private router: Router) {
    //we subscribe to all nagiation events on the router
    //this could probably be optimized, but i dont know how
    this.subscription = this.router.events.subscribe((event) => {
      //a nagivation start ALWAYS happens when you well, begin to navigate. 
      //its literally the first thing that Angular does in its life cycle
      //it happens on a first load, when switching to another page, or just about anything involving angulars routers.
      if (event instanceof NavigationStart) {
        //nagivated basically says if atleast one nagivation thingy has happened
        //aka if has completed the initial navigation

        //at the beginning (when nothings loaded) its true because we literally just accessed it, the URL hasn't reallly even resolved by then.
        //afterwards, due to how angular routing works and how it switches things in the viewport it will always be true, since atleast one nagivation thingy will have completed.
        this._browserRefresh.next(!this.router.navigated);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
