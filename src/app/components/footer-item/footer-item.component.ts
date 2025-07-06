import { Component, Input, input } from '@angular/core';
import { IntermitentLoadingService } from '../../services/intermitent-loading.service';
import { NavbarStuffService } from '../../services/navbar-stuff.service';
import { IDropdownItem } from '../../interfaces/IDropdownItem';

@Component({
  selector: 'app-footer-item',
  standalone: true,
  imports: [],
  templateUrl: './footer-item.component.html',
  styleUrl: './footer-item.component.css'
})
export class FooterItemComponent {

  @Input() item: IDropdownItem = {} as IDropdownItem

  constructor(public readonly temploading: IntermitentLoadingService, public readonly navbarTools: NavbarStuffService){}
}
