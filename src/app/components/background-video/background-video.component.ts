import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input,  OnInit, Renderer2,  ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RButtonComponent } from '../rbutton/rbutton.component';
import { NavbarStuffService } from '../../services/navbar-stuff.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UtilsService } from '../../services/utils.service';

type AlignmentOptions = 'left' | 'center' | 'right';

@Component({
  selector: 'app-background-video',
  standalone: true,
  imports: [CommonModule,  RButtonComponent],
  templateUrl: './background-video.component.html',
  styleUrl: './background-video.component.css',
  animations: [
    trigger('textFadeInUp', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(5vh)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('hidden => visible', animate('0.5s ease-out'))
    ])
  ]
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
  @Input() ButtonAlignment: AlignmentOptions  ='left';
  @Input() scrollFactor: number = 0.5; 
  @Input() initialOffset: number = 0; 
  @Input() textAlignment: AlignmentOptions = 'left';
  @Input() titleFontSize: string = '8vh';
  @Input() descriptionFontSize: string = '5vh';
  @Input() textWidth: string = '100%'; 
  @Input() textBlockAlignment: AlignmentOptions = 'left';
  @Input() LoadingDuration: number = 2000;
  @Input() showTextWhenResponsive: boolean = false;
  @Input() halveTextSize: boolean = true;
  @Input() credits: string = '';
  @Input() autoClickSelector: string = '.video-itself'; // New input for the selector of element to auto-click
  @Input() autoClickDelay: number = 0; // Optional delay before auto-clicking in milliseconds
  
  textAnimationState: 'hidden' | 'visible' = 'hidden';

  //the parent element of the title-text and description-text
  @ViewChild('textContainerElement') textContainerElement!: ElementRef;

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
    private readonly sanitizer: DomSanitizer,
     public scroller:NavbarStuffService,
     private readonly el: ElementRef,
     private readonly renderer: Renderer2,
     private readonly utils: UtilsService
    ) {
      if(document.readyState === 'complete'){
        this.ngOnInit();
      }
      else{
        window.addEventListener('load', () => {
          this.ngOnInit();
        });
      }
    }
                                   
    //HALVING FONT SIZE for responsiveness.
  halveFontSize(fontSize: string): string {
      const numericValue = parseFloat(fontSize);
      const unit = fontSize.replace(numericValue.toString(), '');
  
      const halvedValue = numericValue / 1.5;
  
      return `${halvedValue}${unit}`;
    }
  ngOnInit(): void {
    this.inputScale = this.scale;
    this.scale = this.utils.mapRange(this.diff, 0.1, 1.7,this.inputScale , 6, true)

    //sanitize either the url for video or image, depending
    if (this.video==0){
      this.safeSrc = this.sanitizer.bypassSecurityTrustStyle('url(' + this.src + ')');
    }
    else{
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
   
    //programatic responsiveness
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
      this.updateVideoParallax();
    }
    this.textAnimationState = this.utils.isElementInView(this.textContainerElement) ? 'visible' : 'hidden';
  } 

  ngAfterViewInit() {    
    this.updateVideoParallax();    
    this.textAnimationState = this.utils.isElementInView(this.textContainerElement) ? 'visible' : 'hidden';

    //sometimes the thing just doesnt run properly the first time, so this forces it to re-check again after half a second
    //just incase some element decides to be a bitch
    //if an element still doesn't load after 500ms, it aint gonna load, bro
    setTimeout(() =>{
      this.textAnimationState = this.utils.isElementInView(this.textContainerElement) ? 'visible' : 'hidden';
      
      this.simulateClickOnLoad();
    }, 500)

    setTimeout(() => {
      this.simulateClickOnLoad();
    }, 2000);
  }

  // Method to simulate a click on a specified element
  simulateClickOnLoad(): void {
    if (this.autoClickSelector) {
      setTimeout(() => {
        const elementToClick = this.el.nativeElement.querySelector(this.autoClickSelector);
        if (elementToClick) {
          elementToClick.click();
          console.log(elementToClick);
          console.log(`Auto-clicked element with selector: ${this.autoClickSelector}`);
        } else {
          console.warn(`Element with selector ${this.autoClickSelector} not found for auto-click`);
        }
      }, this.autoClickDelay);
    }
  }

  updateVideoParallax(){
    const parallax = this.el.nativeElement.querySelector('.parallax-background') as HTMLElement;
    const container = this.el.nativeElement.querySelector('.parallax-container') as HTMLElement;
    
    if (parallax && container) {
      this.utils.calculateParallax(container, parallax, this.renderer);
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


}
