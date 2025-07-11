import { Component, Input } from '@angular/core';
import { SimpleBoxComponent } from '../simple-box/simple-box.component';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-showcase-grid',
  standalone: true,
  imports: [SimpleBoxComponent, CommonModule],
  templateUrl: './showcase-grid.component.html',
  styleUrl: './showcase-grid.component.css'
})
export class ShowcaseGridComponent {

  @Input() width!: number;
  @Input() height!: number;
  @Input() gridX!: number;
  @Input() gridY!: number;
  @Input() showcaseList!: any[]; 
  @Input() isExternalWebpage:boolean = false;

//include in helper function
  ratio = window.screen.width/window.screen.height;
  ratioR = Number((this.ratio).toFixed(1))
  diff = Math.abs(this.ratio-1.7);


  ngOnInit(): void {
    if (this.diff>.7){
      this.gridX = 2;
      this.gridY = 3;
    }
    if (this.diff>1){
      this.gridX = 1;
    }
  }

  //generates grids for the showcase grid
  generateGridColumns(): string {
    return `repeat(${this.gridX}, 1fr)`;
  }

  generateGridRows(): string {
    return `repeat(${this.gridY}, 1fr)`;
  }
}
