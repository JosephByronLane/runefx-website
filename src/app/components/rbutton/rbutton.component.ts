import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IntermitentLoadingService } from '../../services/intermitent-loading.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-rbutton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rbutton.component.html',
  styleUrl: './rbutton.component.css'
})
export class RButtonComponent {
  @Input() buttonText: string = 'See All';
  @Input() buttonAlignment: 'left' | 'center' | 'right' = 'center';
  @Input() sendTo: string ="";
  @Input() isExternalWebpage: boolean = false;
  @Input() loadingDuration:number = 2000;
  @Input() onClickFunction: () => void = () => {};
  @Input() doesNavigate: boolean = true;
  @Input() disabled: boolean = false;
  @Input() disabledText: string = '';
  @Input() scrollToTop: boolean = true;
  constructor(private readonly temploading: IntermitentLoadingService, public utils: UtilsService) {}

  handleClick(event: MouseEvent){
    event.preventDefault();
    if(this.disabled) return;
    
    if(this.doesNavigate){
      this.handleNavigation(event);
    } else {
      this.onClickFunction();
    }
  }

  handleNavigation(event: MouseEvent) {
    if (this.isExternalWebpage) {

      //TODO: Try to make this angular rather than standard JS/TS 
      window.open(this.sendTo, '_blank');
    } else {
      //nagivate inside the website
      this.temploading.switchWithLoading(this.sendTo, '', this.loadingDuration, this.scrollToTop, event);
    }
  }
}
