import { Component, OnInit } from '@angular/core';
import { NgSelectOption } from '@angular/forms';
import { SelectControlValueAccessor } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReferralsService } from '../../../services/referrals.service';
import { ValidateService} from '../../../services/validate.service';
import {FlashMessagesService } from 'angular2-flash-messages';
import { Router } from "@angular/router";

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

  constructor(
    private referralsService: ReferralsService) {
  }

  ngOnInit() {
    this.referralsService.getUsersByRole('specialist').subscribe(specialists => {
      this.specialists = specialists;
      this.referralsService.getUsersByRole('practioner').subscribe(practioners => {
        this.practioners = practioners;
      })
    },
      err => {
        console.log(err);
        return false;
      });
  };

  onNewReferralSubmit() {
    
  }


}

