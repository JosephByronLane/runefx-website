import { HostListener, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarStuffService {

  constructor() { }



  //wow i wonder what this function does
  //(it scrolls to the top of the website)
  public scrollToTop() { 
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }



  //tecnically not navbarstuff but eh
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(scrolled:number, scrollFactor:number, initialOffset:number ) {   
    //initial offset is for how far the thing is from the top of the page.
    //scroll factor how much the scrolling affects it (higher scroll factor, lower initial offset)
    //scrolled is how much the user scrolled, duh
    //we divide based on pixel device ratio because the lower the window  %, the higher the image needs to be
    //so at 80% we need to move the image up, so by multiplying it by .8 it normalizes the whole scale
     return initialOffset/27/window.devicePixelRatio*((window.screen.width-window.screen.height)/1000) + scrolled * (scrollFactor/20);
  }
}
