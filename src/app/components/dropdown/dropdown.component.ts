import { Component, Input } from '@angular/core';
import { IDropdownItem } from '../../interfaces/IDropdownItem';
import { CommonModule } from '@angular/common';
import { IntermitentLoadingService } from '../../services/intermitent-loading.service';
import { state, style, trigger, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
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
          scrollTo: 'bruh',
        },
        {
          id: '2',
          displayString: 'man',
          scrollTo: 'bruh',
        },                 
      ]
  }
  @Input() dropdownAnimationDuration: number = 0.25
  @Input() isOpen: boolean = false;

  constructor(public tempLoadingService: IntermitentLoadingService) {}

}
