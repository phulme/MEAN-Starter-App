import { Component, OnInit } from '@angular/core';
import { ValidateService} from '../../services/validate.service';
import {  AuthService } from "../../services/auth.service";
import {FlashMessagesService } from 'angular2-flash-messages';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  title = "Dr";
  firstName: String;
  surname: String;
  registrationNumber: String;
  email: String;
  phoneMobile: String;
  password: String;
  role: String;


  constructor(
    private validateService: ValidateService, 
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { 
  }

  ngOnInit() {
  }

  onRegisterSubmit() {
   const user = {
     title: this.title,
     firstName: this.firstName,
     surname: this.surname,
     email: this.email,
     phoneMobile: this.phoneMobile,
     registrationNumber: this.registrationNumber,
     role: this.role,
     password: this.password
   }

   if(!this.validateService.validateRegister(user)) {
     this.flashMessage.show("Not all fields supplied", {cssClass: 'alert-danger', timeout: 3000});
     return false;
   }

   if(!this.validateService.validateEmail(user.email)) {
    this.flashMessage.show("Invalid Email", {cssClass: 'alert-danger', timeout: 3000});
    return false;
  }

    //register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessage.show("Registration Successful", {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
      this.flashMessage.show("Registration Failed", {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/register']);
    }
    })
  }



}
