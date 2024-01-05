import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit {
  token: string = '';

  constructor(private router: Router)  {}
  signOut(): void {
      localStorage.removeItem('authToken');
      this.router.navigate(['/login-form']);
  }

  ngOnInit(): void {
    const storedToken = localStorage.getItem('authToken');
    if (!storedToken) {
      this.router.navigate(['/login-form']);
      return;
    }
  }
}
