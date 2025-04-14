import { Component, Input } from '@angular/core';
import { IDropdownItem } from '../../interfaces/IDropdownItem';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IntermitentLoadingService } from '../../services/intermitent-loading.service';
import { state, style, trigger, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
  animations: [
    trigger('dropdownAnimation', [
      state('closed', style({
        opacity: 0,
        height: 0,
        visibility: 'hidden'
      })),
      state('open', style({
        opacity: 1,
        height: '*',
        visibility: 'visible'
      })),
      transition('closed <=> open', animate('0.3s ease-in-out')),
    ])
  ]
})
export class DropdownComponent {
  @Input() dropdownItem: IDropdownItem = {
      id: '1',
      title: 'You forgot to set the items',
      link: '/',
      items: [
        {
          id: '1',
          displayString: 'bruh',
          link: '/'
        },
        {
          id: '2',
          displayString: 'man',
          link: '/'
        },                 
      ]
  }
  @Input() dropdownAnimationDuration: number = 0.25
  @Input() isOpen: boolean = false;

  constructor(private tempLoadingService: IntermitentLoadingService) {}
  //TODO: make a helper function to navigate to internal and external links
  navigate(path:string, id:string, duration:number) {
    this.tempLoadingService.switchWithLoading(path, id, duration);
  }


}
