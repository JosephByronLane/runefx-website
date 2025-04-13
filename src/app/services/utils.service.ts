import { ElementRef, Injectable } from '@angular/core';

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
    if (!element) return false;

    const rect = element.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    return rect.top <= windowHeight * 0.8;
  }

  calculateParallax(containerElement: HTMLElement): number{
    const containerRect = containerElement.getBoundingClientRect();
    const containerTop = containerRect.top + window.scrollY;
    const containerHeight = containerRect.height;
    const windowHeight = window.innerHeight;

    const scrolled = window.scrollY+400;
    const offset = scrolled - containerTop;

    const parallaxSpeed = 0.2;
    const translateY = offset * parallaxSpeed;

    const padding = containerHeight * 0.25; 
    const maxTranslateY = padding;
    const minTranslateY = -padding;

    if (scrolled > containerTop - windowHeight && scrolled < containerTop + containerHeight) {
      const boundedTranslateY = Math.max(minTranslateY, Math.min(translateY, maxTranslateY));
      return boundedTranslateY;
    }
    return translateY;
  }
}
