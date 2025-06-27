import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-warning-ox',
  standalone: true,
  imports: [],
  templateUrl: './error-warning-ox.component.html',
  styleUrl: './error-warning-ox.component.css'
})
export class ErrorWarningOxComponent {
  @Input() errorMessage: string = "There seems to be an error loading the forum content.";
  @Input() errorDescription: string = "Please try again later or contact an administrator.";
}
