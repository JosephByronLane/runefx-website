import { Component } from '@angular/core';
import { NavbarStuffService } from '../../services/navbar-stuff.service';
import { IntermitentLoadingService } from '../../services/intermitent-loading.service';
import { items as navbarItems} from '../../data/navbarItems.json'
import { IDropdownItem } from '../../interfaces/IDropdownItem';
import { FooterItemComponent } from '../footer-item/footer-item.component';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FooterItemComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  footerItems: IDropdownItem[] = navbarItems;
  currentYear = new Date().getFullYear();
  constructor(public temploading: IntermitentLoadingService, public navbarTools:NavbarStuffService) {

  }

}
