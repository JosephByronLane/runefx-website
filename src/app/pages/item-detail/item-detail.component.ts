import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { VfxDataFetcherService } from '../../services/vfx-data-fetcher.service';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [BackgroundVideoComponent, InfoBoxComponent],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css'
})
export class ItemDetailComponent {
  item: any; 

  //we initialize the show vfx data service thingy to get all shows
  //ah fuck i still gotta implement this in /home
  constructor(private itemService: VfxDataFetcherService, private route: ActivatedRoute) { }

  //when it inits, search for the name based on the vfx data and get it.
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const slug = params['name']; 
      this.item = this.itemService.getItemBySlug(slug);
    });
  }
}
