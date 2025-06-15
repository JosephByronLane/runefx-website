import { Component } from '@angular/core';
import { NavbarStuffService } from '../../services/navbar-stuff.service';
import { IntermitentLoadingService } from '../../services/intermitent-loading.service';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(public temploading: IntermitentLoadingService, public navbarTools:NavbarStuffService) {}

}
