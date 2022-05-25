import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  events: any = [];
  constructor(private _service: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this._service.userPosts().subscribe(
      (res) => (this.events = res),
      (err) => this._router.navigate(['/login'])
    );
  }
  signout() {
    localStorage.clear();
    this._router.navigate(['/login']);
  }
}
