import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { style, state, trigger, transition, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { RButtonComponent } from '../rbutton/rbutton.component';
@Component({
  selector: 'app-profile-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, RButtonComponent],
  templateUrl: './profile-sidebar.component.html',
  styleUrl: './profile-sidebar.component.css',
  animations: [
    trigger('sidebarState', [
      state('closed', style({
        transform: 'translateX(100%)'
      })),
      state('open', style({
        transform: 'translateX(0)'
      })),
      transition('closed <=> open', [animate('0.3s ease')])
    ]),
    trigger('arrowState', [
      state('closed', style({
        transform: 'rotate(0deg)'
      })),
      state('open', style({
        transform: 'rotate(180deg)'
      })),
      transition('closed <=> open', [animate('1s ease-in-out')])
    ])
  ]
})
export class ProfileSidebarComponent {
  public isOpen: boolean = false;
  public isLoggedIn: boolean = false;
  public username: string = '';
  public password: string = '';


  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
  ngOnInit() {
    this.isOpen = true;
    //implement auth check
  }

  login = (): void => {
    this.isLoggedIn = true;
    console.log('login');
    console.log(this.isLoggedIn);
  }

  logout = (): void => {
    this.isLoggedIn = false;
  }
}
