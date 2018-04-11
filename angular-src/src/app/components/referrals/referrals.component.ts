import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ReferralsService } from '../../services/referrals.service';
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { GridOptions } from "ag-grid";

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.css']
})
export class ReferralsComponent implements OnInit, AfterViewInit {

  referrals: Object;
  private gridOptions: GridOptions;
  columnDefs: any[]
  rowData: any[];

  ngAfterViewInit() {
    console.log('Applying Datatable Info');
    $('#myTable').DataTable();
  }

  title = 'Angular 4 with jquery';
  toggleTitle() {
    $('.title').slideToggle();
    $('#myTable').DataTable();
  };



  constructor(
    private referralsService: ReferralsService,
    private router: Router,
    private flashMsg: FlashMessagesService
  ) { }

  ngOnInit() {
    this.referralsService.getReferrals().subscribe(referrals => {
      this.referrals = referrals;
      this.populateGrid(referrals);
    },
      err => {
        console.log(err);
        return false;
      });
  }

  populateGrid(referrals) {

    const rowData: any[] = [];
    this.gridOptions = <GridOptions>{};
    this.columnDefs = [
      { headerName: "Firstname", field: "firstname" },
      { headerName: "Middle", field: "middle" },
      { headerName: "Surname", field: "surname" },
      { headerName: "Medicare", field: "medicare" }
    ];
    referrals.forEach(element => {
      rowData.push({
        firstname: element.patient.firstname,
        middle: element.patient.middlename,
        surname: element.patient.surname,
        medicare: element.description
      })})
  this.rowData = rowData;
}

onGridReady(params) {
  params.api.sizeColumnsToFit();
}

selectAllRows() {
  this.gridOptions.api.selectAll();
}
}


