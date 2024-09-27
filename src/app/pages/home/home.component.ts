import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShowcaseGridComponent } from '../../components/showcase-grid/showcase-grid.component';
import { SimpleBoxComponent } from '../../components/simple-box/simple-box.component';
import { LoadingScreenService } from '../../services/loading-screen.service'
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { RouterModule } from '@angular/router';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
import { RButtonComponent } from '../../components/rbutton/rbutton.component';
import { VfxDataFetcherService } from '../../services/vfx-data-fetcher.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, ShowcaseGridComponent, SimpleBoxComponent, LoadingScreenComponent, RouterModule, BackgroundVideoComponent, InfoBoxComponent, RButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  ShowcaseList:any[] = [];
  constructor(private loadingScreenService: LoadingScreenService, private VfxData: VfxDataFetcherService) {}
  
  ratio = window.screen.width/window.screen.height;
  ratioR = Number((this.ratio).toFixed(1))
  diff = Math.abs(this.ratio-1.7);
  
  ngOnInit(): void {
    console.log(this.diff);
    this.ShowcaseList = this.VfxData.getAllItems();
    this.ShowcaseList = this.ShowcaseList.slice(0, 9)
    if(this.diff>.7){
      this.ShowcaseList = this.ShowcaseList.slice(0, 6)
    }
  }

}
