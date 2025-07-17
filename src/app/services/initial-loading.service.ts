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

  private loadingscreenelement: HTMLElement | null = null
  private mainBodyElement: HTMLElement | null = null
  

  hideInitialLoadingScreen(): void {   
    if (!this.loadingscreenelement) return;
    if (!this.mainBodyElement) return;

    this.mainBodyElement.classList.remove('main-body-hidden')
    this.loadingscreenelement.classList.add('fade-out');

    setTimeout(() => {
      if (!this.loadingscreenelement) return;

      this.loadingscreenelement.classList.add('disabled');
      this.loadingscreenelement.classList.remove('fade-out');    
    }, 1000); 

    setTimeout(()=>{
      if (!this.loadingscreenelement || !this.mainBodyElement) return;

      this.loadingscreenelement.classList.add("disabled")    
    }, 1000)
  }

  showInitialLoadingScreen(refreshed:boolean):void{
    this.loadingscreenelement = document.getElementById('splash-screen-initial');
    this.mainBodyElement =  document.getElementById('super-duper-main-root')

    if (!this.loadingscreenelement || !this.mainBodyElement) return;
    if(refreshed){
      this.loadingscreenelement.classList.remove("disabled")  
      this.mainBodyElement.classList.add('main-body-hidden')

    }
  }

 

  private _browserRefresh = new BehaviorSubject<boolean>(false);

  public browserRefresh$ = this._browserRefresh.asObservable();
  private subscription: Subscription;


  private isAPIRequest = new BehaviorSubject<boolean>(false)
  public isAPIRequest$ = this.isAPIRequest.asObservable();


  setisAPIRequestFalse(){
    this.isAPIRequest.next(false)
  }
  setisAPIRequestTrue(){
    this.isAPIRequest.next(true)
  }
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
