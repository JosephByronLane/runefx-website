import { Component,} from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.css',
  animations: [
  ]
})
export class LoadingScreenComponent {

  //
  //
  // IF YOURE LOOKING TO DISABLE THE LOADING SCREEN GO INTO APP.COMPONENT.TS
  //
  //
  //


  //IF YOU WANT TO DISABLE IT, GO TO APP.COMPONENT.TS AND SET DEBUG=TRUE;


}
