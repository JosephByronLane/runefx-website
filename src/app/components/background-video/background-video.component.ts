import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, OnChanges, OnInit, Renderer2, SimpleChanges, input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { RButtonComponent } from '../rbutton/rbutton.component';
import { NavbarStuffService } from '../../services/navbar-stuff.service';
import { AbsoluteSourceSpan } from '@angular/compiler';
    
@Component({
  selector: 'app-background-video',
  standalone: true,
  imports: [CommonModule, RouterLink, RButtonComponent],
  templateUrl: './background-video.component.html',
  styleUrl: './background-video.component.css'
})
export class BackgroundVideoComponent implements OnInit {

  //jesus fuck
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() height: string = '100vh'; 
  @Input() src: string = 'https://player.vimeo.com/video/802835584?muted=1&autoplay=1&loop=1&transparent=0&background=1&app_id=122963';
  @Input() scale:number = 1.2;
  @Input() video: number = 1;
  @Input() button: number = 0; 
  @Input() ButtonText:string="Default text."
  @Input() ButtonLink:string=''
  @Input() isExternalWebpage: boolean = false;
  @Input() BottomPadding:string=".9vh";
  @Input() ButtonAlignment: 'left' | 'center' | 'right' ='left';
  @Input() scrollFactor: number = 0.5; 
  @Input() initialOffset: number = 0; 
  @Input() textAlignment: 'left' | 'center' | 'right' = 'left';
  @Input() titleFontSize: string = '8vh';
  @Input() descriptionFontSize: string = '5vh';
  @Input() textWidth: string = '100%'; 
  @Input() textBlockAlignment: 'left' | 'center' | 'right' = 'left';
  @Input() LoadingDuration: number = 2000;
  @Input() showTextWhenResponsive: Boolean = false;
  @Input() halveTextSize: Boolean = true;
  //sanitize url since angular complains otherwise 
  safeSrc!: SafeResourceUrl;

  ////include in helper function

  ratio = window.screen.width/window.screen.height;
  ratioR = Number((this.ratio).toFixed(1))
  diff = Math.abs(this.ratio-1.7);

  justifyContentStyle: string = '';
  textWidthFit = "";

  inputScale = 0;
  showDesc:boolean = true;

  constructor(
    private sanitizer: DomSanitizer,
     public scroller:NavbarStuffService,
     private el: ElementRef,
     private renderer: Renderer2
    ) {}

    //HALVING FONT SIZE for responsiveness.
  halveFontSize(fontSize: string): string {
      const numericValue = parseFloat(fontSize);
      const unit = fontSize.replace(numericValue.toString(), '');
  
      const halvedValue = numericValue / 1.5;
  
      return `${halvedValue}${unit}`;
    }
  ngOnInit(): void {
    this.inputScale = this.scale;
    this.scale = this.mapRange(this.diff, 0.1, 1.7,this.inputScale , 6)

    //sanitize either the url for video or image, depending
    if (this.video==0){
      this.safeSrc = this.sanitizer.bypassSecurityTrustStyle('url(' + this.src + ')');
    }
    else{
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    this.justifyContentStyle = this.getJustifyContent(this.textBlockAlignment);
    this.textWidthFit = this.textWidth;
    if (this.diff>.8){
        this.textAlignment = "center"
        this.ButtonAlignment = "center"
        this.textWidthFit = '100%'
        if(this.halveTextSize){
          this.descriptionFontSize = this.halveFontSize(this.descriptionFontSize);
        }
        if(!this.showTextWhenResponsive){
          this.showDesc = false;
        }
        else{
          this.titleFontSize = this.halveFontSize(this.titleFontSize);
        }
    }

  }
  translateY=this.initialOffset;


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

 //using as a getter rather than a function
  getJustifyContent(alignment: string): string {
    if (this.diff > .8) {
      return 'center';
    } else {
      switch (alignment) {
        case 'left':
          return 'flex-start';
        case 'center':
          return 'center';
        case 'right':
          return 'flex-end';
        default:
          return 'center';
      }
    }
  }

//include in helper function
  mapRange(x: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    const result = ((x - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;

    // Clamp the result between outMin and outMax to prevent overshooting
    return Math.max(outMin, Math.min(result, outMax));
  }
}
