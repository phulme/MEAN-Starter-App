import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  email: String;
  password: String;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMsg:FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      email: this.email,
      password: this.password
    }
    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMsg.show('You are now logged in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['dashboard']);
      } else {
      this.flashMsg.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
      this.router.navigate(['login']);
    }
    })
  }

}
