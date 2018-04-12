import { Component, OnInit } from '@angular/core';
import { ReferralsService } from '../../services/referrals.service';
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { GridOptions } from "ag-grid";

// declare var jquery: any;
// declare var $: any;

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.css']
})
export class ReferralsComponent implements OnInit {

  referrals: Object;
  private gridOptions: GridOptions;
  columnDefs: any[]
  rowData: any[];

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
    this.gridOptions = <GridOptions>{
      enableFilter: true
    };
    this.columnDefs = [
      { headerName: "Firstname", field: "firstname",editable: false, filter: "agTextColumnFilter", width: 115 },
      { headerName: "Middle", field: "middle",  filter: "agTextColumnFilter", width: 50 },
      { headerName: "Surname", field: "surname",  filter: "agTextColumnFilter", width: 115 },
      { headerName: "Medicare", field: "medicare", width: 100 },
      { headerName: "specialist", field: "specialist", width: 115 },
      { headerName: "Description", field: "description", width: 255 }
    ];
    referrals.forEach(element => {
      // console.log(element);
      rowData.push({
        firstname: element.patient.firstname,
        middle: element.patient.middlename,
        surname: element.patient.surname,
        medicare: element.patient.medicarenumber,
        specialist: element.specialist.surname,
        description: element.description
      })})
  this.rowData = rowData;
}

onGridReady(params) {
  params.api.sizeColumnsToFit();
}

selectAllRows() {
  this.gridOptions.api.selectAll();
}

 // ngAfterViewInit() {
  //   console.log('Applying Datatable Info');
  //   $('#myTable').DataTable();
  // }

  // toggleTitle() {
  //   $('.title').slideToggle();
  //   $('#myTable').DataTable();
  // };

}


