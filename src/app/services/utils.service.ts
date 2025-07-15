import { ElementRef, Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})



export class UtilsService {

  constructor() { }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  mapRange(x: number, inMin: number, inMax: number, outMin: number, outMax: number, clamp: boolean = false): number {
    const result = ((x - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;

    if (clamp) {
      return Math.max(outMin, Math.min(result, outMax));
    }

    return result;
  }

  isElementInView(element: ElementRef): boolean {
    if (!element){
      return false;
    }

    const rect = element.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const isInView = rect.top <= windowHeight * 0.8;

    return isInView;
  }

  calculateParallax(containerElement: HTMLElement, parallaxElement: HTMLElement, renderer: Renderer2): void{
    if (!containerElement || !parallaxElement || !renderer) {
      return;
    }
    
    const containerRect = containerElement.getBoundingClientRect();
    const containerTop = containerRect.top + window.scrollY;
    const containerHeight = containerRect.height;

    const scrolled = window.scrollY+400;
    const offset = scrolled - containerTop;

    const parallaxSpeed = 0.2;
    const translateY = offset * parallaxSpeed;

    const padding = containerHeight * 0.25; 
    const maxTranslateY = padding;
    const minTranslateY = -padding;

    const boundedTranslateY = Math.max(minTranslateY, Math.min(translateY, maxTranslateY));
    renderer.setStyle(parallaxElement, 'transform', `translateY(${boundedTranslateY}px)`);
  
  }
  units = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];

  calculateTimeDifference = (time: number) => {
    for (let { label, seconds } of this.units) {
      const interval = Math.floor(time / seconds);
      if (interval >= 1) {
        return {
          interval: interval,
          unit: label
        };
      }
    }
    return {
      interval: 0,
      unit: ''
    };
  };

  timeAgo = (date: string | number | Date) => {
    const time = this.getTime(date);

    //so the forum posts were made between oldestDate and newestDate, but I'd like for it to seem like t he
    //forum posts aren't from JUST that date; id like for the posts to seem more recent than that.
    
    //So we grab the oldest date and newest date, and I'll use a map range to set the percievedTimeNewest to be yesterday, and the percievedTimeOldest to be 8 months ago.


    const oldestDate: string = "2024-02-01 10:35:00-06";
    const newestDate: string = "2024-07-30 12:30:00-06";

    //time MUST be between these two dates.
    const timeOldest = this.getTime(oldestDate);
    const timeNewest = this.getTime(newestDate);

    const todaysDate = new Date();
    const todaysTime = this.getTime(todaysDate);

    const eightMonthsAgoTime = todaysTime + 13 * 30 * 24 * 60 * 60;
    
    const percivedTime = this.mapRange(time, timeOldest, timeNewest, eightMonthsAgoTime, todaysTime);

    const { interval, unit } = this.calculateTimeDifference(percivedTime);
    const suffix = interval === 1 ? '' : 's';
    return `${interval} ${unit}${suffix} ago`;
  };

  getTime(date: string | number | Date): number {
    return Math.floor(
      (new Date().valueOf() - new Date(date).valueOf()) / 1000
    )
  }


  replaceNewLines(content: string): string {
    return content.replace(/\\n/g, '\n');
  }

}
