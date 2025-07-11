import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
import { IVFXItem } from '../../interfaces/IVFXItem';
import { VfxService } from '../../services/vfx.service';
import { ErrorWarningOxComponent } from '../../components/error-warning-ox/error-warning-ox.component';
import { IntermitentLoadingService } from '../../services/intermitent-loading.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [BackgroundVideoComponent, InfoBoxComponent, ErrorWarningOxComponent, ],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css'
})
export class ItemDetailComponent {
  item!: IVFXItem; 

 constructor(private VfxData: VfxService, private route: ActivatedRoute, loadingService: IntermitentLoadingService) {
    this.route.params.subscribe(params => {
      const id = params['id']; 
      this.VfxData.getSingleShow(id)
      .subscribe({
        next: (value: IVFXItem) =>{
          this.item = value
        },
        error: (error: HttpErrorResponse) =>{
          console.log(error);
          if (error.status){
            loadingService.switchWithLoading('404')
          }
        }
      })
    });
   }

}
