import { Component, OnInit } from '@angular/core';
import { NgSelectOption } from '@angular/forms';
import { SelectControlValueAccessor } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReferralsService } from '../../../services/referrals.service';
import { UserService } from '../../../services/user.service';
import { ValidateService } from '../../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from "@angular/router";
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-new-referral',
  templateUrl: './new-referral.component.html',
  styleUrls: ['./new-referral.component.css']
})
export class NewReferralComponent implements OnInit {

  specialists: any;
  practioners: any;
  practices: any;
  expiry: Date = new Date();
  // Variables for new referral form
    p_firstname: String;
    p_middlename: String;
    p_surname: String;
    p_phone: [String];
    p_email: [String];
    p_medicarenumber: Number;
  practice: String;
  practioner: String;
  specialist: String;
  description: String;
  status: String;

  constructor(
    private referralsService: ReferralsService,
    private userService: UserService,
    private validateService: ValidateService, 
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.userService.getUsersByRole('specialist').subscribe(specialists => { this.specialists = specialists });
    this.userService.getUsersByRole('practioner').subscribe(practioners => { this.practioners = practioners });
    this.userService.getPractices().subscribe(practices => { this.practices = practices });
    err => {
      console.log(err);
      return false;
    };
  };

  onNewReferralSubmit() {
    console.log('Creating new referral');
    const referral = {
      patient: {
        p_firstname: this.p_firstname,
        p_middlename: this.p_middlename, 
        p_surname: this.p_surname, 
        p_phone: this.p_phone,
        p_email: this.p_email, 
        p_medicarenumber: this.p_medicarenumber
      },
    
      practice: this.practice, 
      practioner: this.practioner, 
      specialist: this.specialist, 
      description: this.description,
      expiry: this.expiry,
      creation_date:  new Date(),
      status: 'new'


    }
       //Create new referral
       this.referralsService.newReferral(referral).subscribe(data => {
        if(data.success) {
          this.flashMessage.show("Referral Created", {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/referrals']);
        } else {
        this.flashMessage.show("Unable to create referral", {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/referrals/new']);
      }
      })
  }


}

