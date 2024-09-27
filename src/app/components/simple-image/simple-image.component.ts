import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, OnInit, Renderer2, input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { NavbarStuffService } from '../../services/navbar-stuff.service';

@Component({
  selector: 'app-simple-image',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './simple-image.component.html',
  styleUrl: './simple-image.component.css'
})
export class SimpleImageComponent implements OnInit{
  //init variables
  @Input() src:string="";
  @Input() scale:number=1;
  @Input() scrollFactor: number = 0.5; 
  @Input() initialOffset: number = 0; 
  @Input() video:number = 0;
  safeSrc!: SafeResourceUrl;

  //dom sanitizer cause angular or something  complained about unsafe websites
  constructor(
    private sanitizer: DomSanitizer,
     public scroller:NavbarStuffService,
     private el: ElementRef,
     private renderer: Renderer2
    ) {}

  //sanitize the url so that  bitchass don't complain
  ngOnInit(): void {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
  }
  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    //only apply parallax to bg images, not to video
    if (this.video==0){
      const parallax = this.el.nativeElement.querySelector('.parallax-background') as HTMLElement;
      const container = this.el.nativeElement.querySelector('.parallax-container') as HTMLElement;
      const containerRect = container.getBoundingClientRect();
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
        this.renderer.setStyle(parallax, 'transform', `translateY(${boundedTranslateY}px)`);
      }
    }
  }
}
