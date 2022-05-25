import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  serverError = '';
  loginUserData: any = {};
  constructor(private _auth: AuthService, private _router: Router) {}
  islogged: boolean = this._auth.isLoggedIn;
  ngOnInit(): void {}

  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe(
      (res: any) => {
        localStorage.setItem('access_token', res.token);
        this._auth.userPosts().subscribe((res) => {
          this._router.navigate(['/posts']);
        });
      },
      (err) => {
        this.serverError = err.error;
        alert(JSON.stringify(this.serverError));
      }
    );
  }
  signout() {
    localStorage.clear();
    this._router.navigate(['/login']);
  }
}
