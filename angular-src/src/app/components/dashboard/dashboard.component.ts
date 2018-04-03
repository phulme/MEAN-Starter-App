import { Component, OnInit } from '@angular/core';
import {AfterViewInit} from '@angular/core';

declare const fReplace: Function;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //Placeholder for indivdual Stastics
  ind_refferal_review :Number = 10;
  ind_refferal_open :Number = 198;
  ind_refferal_expired :Number = 4;

  ind_pathology_review :Number = 98;
  ind_pathology_open :Number = 337;
  ind_pathology_expired :Number = 102;
  
  ind_imaging_review :Number = 4;
  ind_imaging_open :Number = 67;
  ind_imaging_expired :Number = 2;

  //Placeholders for practice stastics
  prac_refferal_review :Number = 100;
  prac_refferal_open :Number = 798;
  prac_refferal_expired :Number = 141;

  prac_pathology_review :Number = 698;
  prac_pathology_open :Number = 637;
  prac_pathology_expired :Number = 532;
  
  prac_imaging_review :Number = 40;
  prac_imaging_open :Number = 209;
  prac_imaging_expired :Number = 20;

  constructor() { 
  }

  ngOnInit() {}

  ngAfterViewInit() {
   fReplace();

 }
}
