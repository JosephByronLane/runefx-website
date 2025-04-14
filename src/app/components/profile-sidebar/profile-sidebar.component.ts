import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { style, state, trigger, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-profile-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-sidebar.component.html',
  styleUrl: './profile-sidebar.component.css',
  animations: [
    trigger('sidebarState', [
      state('closed', style({
        width:  '0px'
      })),
      state('open', style({
        width: '15vw'
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

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
  ngOnInit() {
    this.isOpen = false;
    //implement auth check
  }

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }
}
