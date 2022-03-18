import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('engahmedshehatah@gmail.com', Validators.required),
    password: new FormControl('01014787164', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.authService.login(this.loginForm.value).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/countries').then(() => {
          console.log('authentication successful');
        });
      },
      err => console.log(err)
    );
  }

}
