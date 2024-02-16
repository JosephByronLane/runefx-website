import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges, input } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { RButtonComponent } from '../rbutton/rbutton.component';
import { NavbarStuffService } from '../../services/navbar-stuff.service';
    
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
  @Input() BottomPadding:string=".9vh";
  @Input() ButtonAlignment: 'left' | 'center' | 'right' ='left'
  @Input() scrollFactor: number = 0.5; 
  @Input() initialOffset: number = 0; 
  @Input() textAlignment: 'left' | 'center' | 'right' = 'left';
  @Input() titleFontSize: string = '8vh';
  @Input() descriptionFontSize: string = '5vh';
  @Input() textWidth: string = '100%'; 
  @Input() textBlockAlignment: 'left' | 'center' | 'right' = 'left';
  @Input() LoadingDuration: number = 2000;

  //sanitize url since angular complains otherwise 
  safeSrc!: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer, public scroller:NavbarStuffService) {}
  ngOnInit(): void {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
  }
  translateY=this.initialOffset;


  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.translateY = this.scroller.onWindowScroll(window.scrollY,this.scrollFactor,this.initialOffset);
  }

  //i could delete this, but honestly i really dont feel like changing the rest of the code
  getJustifyContent(alignment: string): string {
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
