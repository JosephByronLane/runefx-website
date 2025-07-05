import { Component } from '@angular/core';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { AccordionComponent } from '../../components/accordion/accordion.component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [BackgroundVideoComponent, AccordionComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
accordionItems = [
  { title: 'asdasd', content: 'aaaaaaaaaa' },
  { title: 'asdasdasd', content: 'bbbbbbbbbb' },
  { title: 'asdasdasd', content: 'ccccccccccccccc' }
];
}
