import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IntermitentLoadingService } from '../../services/intermitent-loading.service';
import { VfxDataFetcherService } from '../../services/vfx-data-fetcher.service';
import { NavbarStuffService } from '../../services/navbar-stuff.service';

@Component({
  selector: 'app-simple-box',
  standalone: true,
  imports: [],
  templateUrl: './simple-box.component.html',
  styleUrl: './simple-box.component.css'
})
export class SimpleBoxComponent {
  @Input() item: any; 
  constructor(private router: Router, public readonly loader:IntermitentLoadingService, private dataFetches :VfxDataFetcherService, public navbarTools:NavbarStuffService) {}

  localDataFetcher :any; //im lazy, judge me.

  //we remove the dashes and replace them with spaces, since thats how they are in the json
  navigateToDetails(event: MouseEvent): void {
    const itemSlug = this.dataFetches.createSlug(this.item.title); 
    this.loader.switchWithLoading('/vfx/' + itemSlug,'', 1000, true, event);
  }

  getItemSlug(): string {
    return this.dataFetches.createSlug(this.item.title);
  }

}
