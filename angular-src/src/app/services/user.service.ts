import { Injectable } from '@angular/core';
import  { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class UserService {

  authToken: any;

  constructor(private http:Http) { }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  getUsersByRole(role) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/users/role/' + role, {headers: headers}).map(res => res.json());

  }

  getPractices() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/practices/all', {headers: headers}).map(res => res.json());

  }
}
