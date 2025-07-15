import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShowcaseGridComponent } from '../../components/showcase-grid/showcase-grid.component';
import { SimpleBoxComponent } from '../../components/simple-box/simple-box.component';
import { IntermitentLoadingService } from '../../services/intermitent-loading.service';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { RouterModule } from '@angular/router';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
import { RButtonComponent } from '../../components/rbutton/rbutton.component';
import { VfxService } from '../../services/vfx.service';
import { IVFXItem } from '../../interfaces/IVFXItem';
import { ErrorWarningOxComponent } from '../../components/error-warning-ox/error-warning-ox.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, ShowcaseGridComponent, LoadingScreenComponent, RouterModule, BackgroundVideoComponent, InfoBoxComponent, RButtonComponent, ErrorWarningOxComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  public ShowcaseList:IVFXItem[] = []
  constructor(private loadingScreenService: IntermitentLoadingService, private VfxData: VfxService) {}
  
  ratio = window.screen.width/window.screen.height;
  ratioR = Number((this.ratio).toFixed(1))
  diff = Math.abs(this.ratio-1.7);
  
  ngOnInit(): void {
    let sliceNumber: number = 9 
    if(this.diff>.7){
       sliceNumber = 6
    }
      this.VfxData.getShows()
      .subscribe({
        next: (value: IVFXItem[]) =>{
          this.ShowcaseList = value.slice(0,sliceNumber);
        },
        error: (error) =>{
          console.error(error);
        }
      })    

  }

}
