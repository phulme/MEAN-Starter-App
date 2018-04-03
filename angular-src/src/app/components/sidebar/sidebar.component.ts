import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar2.component.html',
  styleUrls: ['./sidebar2.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router,
  ) { }

  ngOnInit() {
  }

}
