import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit, input } from '@angular/core';
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
  constructor(private sanitizer: DomSanitizer, public scroller:NavbarStuffService) {}

  //sanitize the url so that  bitchass don't complain
  ngOnInit(): void {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
  }
  
  translateY=this.initialOffset;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.translateY = this.scroller.onWindowScroll(window.scrollY,this.scrollFactor,this.initialOffset);
  }}
