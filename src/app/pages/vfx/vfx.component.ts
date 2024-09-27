import { Component, OnInit } from '@angular/core';
import { ShittyNavbarComponent } from '../../components/shitty-navbar/shitty-navbar.component';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { ShowcaseGridComponent } from '../../components/showcase-grid/showcase-grid.component';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
import { VfxDataFetcherService } from '../../services/vfx-data-fetcher.service';
import { InitialLoadingService, browserRefresh } from '../../services/initial-loading.service';
import { LoadingScreenService  } from '../../services/loading-screen.service';

@Component({
  selector: 'app-vfx',
  standalone: true,
  imports: [ShittyNavbarComponent, BackgroundVideoComponent, ShowcaseGridComponent, InfoBoxComponent],
  templateUrl: './vfx.component.html',
  styleUrl: './vfx.component.css'
})
export class VfxComponent implements OnInit{
  itemCount:number = 0;
  ShowcaseList:any[]=[ ]
  filteredShowcaseList: any[] = [];
  public browserRefresh?: boolean;

  constructor(private VfxData: VfxDataFetcherService, private loadingService: InitialLoadingService, public loader:InitialLoadingService){
  }


  //we use this to  1) get the data of the shows
  //and 2) see if brower refreshed (for loading screen)
  ngOnInit() {
    this.ShowcaseList = this.VfxData.getAllItems();
    this.itemCount = this.navItems.length;
  }

  //filter shit by year so i can just dump it all into the huge json
  filterShowcaseListByYear(year: string) {
    return this.filteredShowcaseList = this.ShowcaseList.filter(item => item.year === year);
  }
  
  //nav items for shitty navbar. There should be one similar to this in /render
  navItems = [
    { text: '2024', targetId: '2024' },
    { text: '2023', targetId: '2023' },
    { text: '2022', targetId: '2022' },
    { text: '2021', targetId: '2021' },
    { text: '2020', targetId: '2020' },
    { text: '2019', targetId: '2019' },
    { text: '2018', targetId: '2018' },
    { text: '2017', targetId: '2017' },
  ];


  
}
