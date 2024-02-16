import { Component } from '@angular/core';
import { LoadingScreenService } from '../../services/loading-screen.service';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-intermitent-loading',
  standalone: true,
  imports: [],
  templateUrl: './intermitent-loading.component.html',
  styleUrl: './intermitent-loading.component.css'
})
export class IntermitentLoadingComponent {

  //this simply houses the html and css. refer to Intermitent loading service for details.

}
