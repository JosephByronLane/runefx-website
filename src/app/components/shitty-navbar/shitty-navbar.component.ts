import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-shitty-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shitty-navbar.component.html',
  styleUrl: './shitty-navbar.component.css'
})
export class ShittyNavbarComponent {
  @Input() navItems: { text: string, targetId: string }[] = [];
  @Input() gridColumnCount: number = 4; 


  constructor (public readonly utilsService: UtilsService){

  }
  //scroll to said element. Im fairly sure i can generalize this and put it in a service but eh.

  
  //include in helper function
  ratio = window.screen.width/window.screen.height;
  ratioR = Number((this.ratio).toFixed(1))
  diff = Math.abs(this.ratio-1.7);


  ngOnInit(): void {
    this.gridColumnCount = this.navItems.length;

    if (this.diff>1){
      this.gridColumnCount /=2;

    }
}

}
