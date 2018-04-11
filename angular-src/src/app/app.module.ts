import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpModule} from '@angular/http';
import { RouterModule, Routes, RouterLinkActive} from '@angular/router';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TermsandconditionsComponent } from './components/termsandconditions/termsandconditions.component';

import { ValidateService } from "./services/validate.service";
import { AuthService } from "./services/auth.service";
import { ReferralsService } from "./services/referrals.service";
import { UserService } from "./services/user.service";
import { FlashMessagesModule, FlashMessagesService } from "angular2-flash-messages";

import { AuthGuard } from "./guards/auth.guard";
import { ReferralsComponent } from './components/referrals/referrals.component';
import { PathologyComponent } from './components/pathology/pathology.component';
import { ImagingComponent } from './components/imaging/imaging.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ReportsComponent } from './components/reports/reports.component';
import { NewReferralComponent } from './components/referrals/new-referral/new-referral.component';
import {AgGridModule} from 'ag-grid-angular';


const appRoutes: Routes = [
  {path: '', 
   component: HomeComponent},
  {path: 'register', 
  component: RegisterComponent},

  {path: 'login', 
  component: LoginComponent},

  {path: 'dashboard', 
  component: DashboardComponent, 
  canActivate:[AuthGuard]},

  {path: 'profile', 
  component: ProfileComponent,  
  canActivate:[AuthGuard]},

  {path: 'terms', 
  component: TermsandconditionsComponent},

  {path: 'referrals', 
  component: ReferralsComponent, 
  canActivate:[AuthGuard]},

  {path: 'referrals/new', 
  component: NewReferralComponent, 
  canActivate:[AuthGuard]},

  {path: 'pathology', 
  component: PathologyComponent, 
  canActivate:[AuthGuard]},

  {path: 'imaging', 
  component: ImagingComponent, 
  canActivate:[AuthGuard]},
  
  {path: 'reports', 
  component: ReportsComponent, 
  canActivate:[AuthGuard]}
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    TermsandconditionsComponent,
    ReferralsComponent,
    PathologyComponent,
    ImagingComponent,
    SidebarComponent,
    ReportsComponent,
    NewReferralComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    AgGridModule.withComponents([/*optional Angular Components to be used in the grid*/])
  ],
  providers: [ValidateService, FlashMessagesService, AuthService, ReferralsService, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
