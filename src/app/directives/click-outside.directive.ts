import { Directive, ElementRef, Output, EventEmitter, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true  
})
export class ClickOutsideDirective {
  @Output() appClickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.appClickOutside.emit();
    }
  }
}
