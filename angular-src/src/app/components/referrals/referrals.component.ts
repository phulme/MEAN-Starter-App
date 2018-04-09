import { Component, OnInit } from '@angular/core';
import { ReferralsService } from '../../services/referrals.service';
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.css']
})
export class ReferralsComponent implements OnInit {

  referrals:Object;

  constructor(
    private referralsService:ReferralsService,
    private router:Router,
    private flashMsg:FlashMessagesService
  ) { }

  ngOnInit() {
    this.referralsService.getReferrals().subscribe(referrals => {
      this.referrals = referrals;
    },
  err => {
    console.log(err);
    return false;
  });
  }

}
