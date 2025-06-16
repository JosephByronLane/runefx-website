import { Component, Input } from '@angular/core';
import { IntermitentLoadingService } from '../../services/intermitent-loading.service';

@Component({
  selector: 'app-showcase-box',
  standalone: true,
  imports: [],
  templateUrl: './showcase-box.component.html',
  styleUrl: './showcase-box.component.css'
})
export class ShowcaseBoxComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageUrl: string = '';
  @Input() redirectTo: string = '';

  @Input() imageSplit: number = 50;

  constructor(readonly tempLoadingService: IntermitentLoadingService) { }
}
