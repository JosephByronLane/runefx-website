import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IntermitentLoadingService } from '../../services/intermitent-loading.service';
import { NavbarStuffService } from '../../services/navbar-stuff.service';
import { VfxService } from '../../services/vfx.service';
import { IVFXItem } from '../../interfaces/IVFXItem';

@Component({
  selector: 'app-simple-box',
  standalone: true,
  imports: [],
  templateUrl: './simple-box.component.html',
  styleUrl: './simple-box.component.css'
})
export class SimpleBoxComponent {
  @Input() item!: IVFXItem; 
  constructor(private router: Router, public readonly loader:IntermitentLoadingService, private dataFetches :VfxService, public navbarTools:NavbarStuffService) {}

  localDataFetcher :any; //im lazy, judge me.

  //we remove the dashes and replace them with spaces, since thats how they are in the json
  navigateToDetails(event: MouseEvent): void {
    this.loader.switchWithLoading('/vfx/' +  this.item.id,'', 1000, true, event);
  }



}
