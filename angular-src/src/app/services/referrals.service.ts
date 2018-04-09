import { Injectable } from '@angular/core';
import  { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class ReferralsService {
  
  authToken: any;
  referral: any;

  constructor(private http:Http) { }

  getReferrals() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken)
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/referrals/referrals', {headers: headers}).map(res => res.json());
  }

  newReferral(referral) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/referrals/new', referral, {headers: headers}).map(res => res.json());
  }

  getUsersByRole(role) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/users/role/' + role, {headers: headers}).map(res => res.json());

  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }


}
