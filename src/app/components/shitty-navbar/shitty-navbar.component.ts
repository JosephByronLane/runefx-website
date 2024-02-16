import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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

  //scroll to said element. Im fairly sure i can generalize this and put it in a service but eh.
  scrollToElement(targetId: string, offset: number): void {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
  }
}
