import { Component, Input } from '@angular/core';
import { IDropdownItem } from '../../interfaces/IDropdownItem';
import { IntermitentLoadingService } from '../../services/intermitent-loading.service';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-navbar-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-accordion.component.html',
  styleUrl: './navbar-accordion.component.css',
  animations: [
        trigger('accordionAnimation', [
          state('closed', style({
            height: '0',
            overflow: 'hidden',
            opacity: 0,
            padding: '0'
          })),
          state('open', style({
            height: '*',
            opacity: 1,
            padding: '*'
          })),
          transition('closed <=> open', animate('300ms ease-in-out'))
        ]),
  ]
})
export class NavbarAccordionComponent {
  @Input() item: IDropdownItem = {} as IDropdownItem
  isAcordionOpen: boolean = false;
  constructor (
    private readonly temploading: IntermitentLoadingService,
    private readonly mainNavbarComponent: NavbarComponent
  ){}
  
  toggleAccordion(id: string) {
    this.isAcordionOpen = !this.isAcordionOpen
  }

  navigateAndClose(path:string, id:string, duration:number) {
    this.mainNavbarComponent.closeMenu()
    this.isAcordionOpen = false;
    this.temploading.switchWithLoading(path, id, duration, true);    
  }
}
