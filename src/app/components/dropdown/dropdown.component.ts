import { Component, Input } from '@angular/core';
import { IDropdownItem } from '../../interfaces/IDropdownItem';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IntermitentLoadingService } from '../../services/intermitent-loading.service';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
  @Input() dropdownItem: IDropdownItem = {
      id: '1',
      title: 'You forgot to set the items',
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


  constructor(private tempLoadingService: IntermitentLoadingService) {}
  isOpen: boolean = false;
  //TODO: make a helper function to navigate to internal and external links
  navigate(path:string, id:string, duration:number) {
    this.tempLoadingService.switchWithLoading(path, id, duration);
  }
}
