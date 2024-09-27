import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ShowcaseGridComponent } from './components/showcase-grid/showcase-grid.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { HttpClientModule } from '@angular/common/http';
import { IntermitentLoadingComponent } from './components/intermitent-loading/intermitent-loading.component';
import { Subscription } from 'rxjs';
import { InitialLoadingService, browserRefresh } from './services/initial-loading.service';
export let LocalbrowserRefresh = false;
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent,ShowcaseGridComponent, LoadingScreenComponent,HttpClientModule, IntermitentLoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  private routeSub!: Subscription;
  browserRefresh?: boolean;
  subscription: Subscription;


  //DEBUG FLAG TO STOP INITIAL LOADING SCREEN
  debug: boolean = false;



  ///omfg it took me the whole fucking 4 days to get this working
  constructor(public initloader: InitialLoadingService, private router: Router, private activatedRoute: ActivatedRoute, private location: Location) {
    //subscribe to refreshed to get updates on it
    //if it updates, and its true then show the bigass loading screen
    this.subscription = this.initloader.browserRefresh.subscribe((refreshed) => {
      if(refreshed){
        var pathString = location.path();
        //when we're on home, the url is undefined because its literally nothing, so when that happens we replace it with '' so it finds the correct value.
        pathString = pathString.split('/')[1];
        if (pathString===undefined) pathString=''
        if(!this.debug){
          initloader.startLoadingScreen(pathString, refreshed);         

        }
      }
    });
  }

  //not quite sure what this does but at this point im scared of removing it.
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  
}
