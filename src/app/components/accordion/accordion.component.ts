import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css'
})
export class AccordionComponent {
  @Input() title: string = '';
  @Input() content: string = '';
  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
