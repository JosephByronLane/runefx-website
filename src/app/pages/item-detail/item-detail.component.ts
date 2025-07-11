import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { VfxDataFetcherService } from '../../services/vfx-data-fetcher.service';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
import { IVFXItem } from '../../interfaces/IVFXItem';
import { VfxService } from '../../services/vfx.service';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [BackgroundVideoComponent, InfoBoxComponent],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css'
})
export class ItemDetailComponent {
  item!: IVFXItem; 

 constructor(private VfxData: VfxService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const id = params['id']; 
      this.VfxData.getSingleShow(id)
      .subscribe({
        next: (value: IVFXItem) =>{
          this.item = value
        },
        error: (error) =>{
          console.log(error);

        }
      })
    });
   }

}
