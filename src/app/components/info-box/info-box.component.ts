import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-info-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-box.component.html',
  styleUrl: './info-box.component.css'
})
export class InfoBoxComponent {
  @Input() title: string = "DEFAULT TITLE";
  @Input() desc!: string;
  @Input() video:number=0;

  //this is used to add custom html to the infobox
  @ContentChild(TemplateRef) contentTemplate!: TemplateRef<any>;


  //HALVING FONT SIZE for responsiveness.
  halveFontSize(fontSize: string): string {
    const numericValue = parseFloat(fontSize);
    const unit = fontSize.replace(numericValue.toString(), '');

    const halvedValue = numericValue / 1.5;

    return `${halvedValue}${unit}`;
  }
}
