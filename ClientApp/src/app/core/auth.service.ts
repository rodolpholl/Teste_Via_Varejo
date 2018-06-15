import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginModel } from '../models/login';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {}

  login(model: LoginModel): Observable<any> {
    console.log('efetuando Login ::');
    return this.http.post<any>('https://localhost:44393/api/Login', model);
  }

}