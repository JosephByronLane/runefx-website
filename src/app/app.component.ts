import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ShowcaseGridComponent } from './components/showcase-grid/showcase-grid.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { IntermitentLoadingComponent } from './components/intermitent-loading/intermitent-loading.component';
import { Subscription } from 'rxjs';
import { InitialLoadingService, browserRefresh } from './services/initial-loading.service';
export let LocalbrowserRefresh = false;
import { Location } from '@angular/common';
import { ProfileSidebarComponent } from './components/profile-sidebar/profile-sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent,ShowcaseGridComponent, LoadingScreenComponent, IntermitentLoadingComponent, ProfileSidebarComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  private routeSub!: Subscription;
  browserRefresh?: boolean;
  subscription: Subscription;

  showLoadingScreen: boolean = environment.production  

  //DEBUG FLAG TO STOP INITIAL LOADING SCREEN

  

  ///omfg it took me the whole fucking 4 days to get this working
  constructor(public initloader: InitialLoadingService, private readonly router: Router, private activatedRoute: ActivatedRoute, private readonly location: Location) {
    //subscribe to refreshed to get updates on it
    //if it updates, and its true then show the bigass loading screen
    this.subscription = this.initloader.browserRefresh.subscribe((refreshed) => {
      if(refreshed){
        let pathString = location.path();
        //when we're on home, the url is undefined because its literally nothing, so when that happens we replace it with '' so it finds the correct value.
        pathString = pathString.split('/')[1];
        if (pathString===undefined) pathString=''
        if(this.showLoadingScreen){
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
