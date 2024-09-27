import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarStuffService } from '../../services/navbar-stuff.service';
import { IntermitentLoadingService } from '../../services/intermitent-loading.service';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(private router: Router, private route: ActivatedRoute, public temploading: IntermitentLoadingService, public navbarTools:NavbarStuffService) {}

}
