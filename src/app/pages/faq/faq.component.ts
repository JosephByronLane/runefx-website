import { Component } from '@angular/core';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { AccordionComponent } from '../../components/accordion/accordion.component';
import { CommonModule } from '@angular/common';
import { IFaqItem } from '../../interfaces/IFaqItem';
import { allAccordionItems as items } from '../../data/faqItems.json';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
import { RButtonComponent } from '../../components/rbutton/rbutton.component';


@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [BackgroundVideoComponent, AccordionComponent, CommonModule, InfoBoxComponent, RButtonComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  
  accordionItems: IFaqItem[] = items

    
  
}
