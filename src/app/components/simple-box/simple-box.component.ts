import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingScreenService } from '../../services/loading-screen.service';
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
  constructor(private router: Router, private loader:LoadingScreenService, private dataFetches :VfxDataFetcherService, public navbarTools:NavbarStuffService) {}

  localDataFetcher :any; //im lazy, judge me.

  //we remove the dashes and replace them with spaces, since thats how they are in the json
  navigateToDetails(): void {
    const itemSlug = this.dataFetches.createSlug(this.item.title); //indian youtube man said these were called slugs.
   // this.router.navigate(['/vfx', itemSlug]);  
    this.loader.switchWithLoading('/vfx/' + itemSlug,'', 1000);
  }


}
