import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import { LoginModel } from '../models/login';
import { AuthService } from '../core/auth.service';
import { TokenStorage } from '../core/token.storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor(private router: Router, public dialog: MatDialog, private loginService: AuthService, private token: TokenStorage ) {   }

   loginModel: LoginModel = {login: "", senha: ""};

  login(): void {
    this.loginService.login(this.loginModel).subscribe(
      data => {
        this.token.saveToken(data.accessToken);
        this.token.saveLoggedUser(data.idLoggedUser);
        this.router.navigate(['distancias']);
      }
    );
  }
  

}
