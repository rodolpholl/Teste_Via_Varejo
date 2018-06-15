import { Injectable } from '@angular/core';


const TOKEN_KEY = 'TokendeAutenticacao33645';

@Injectable()
export class TokenStorage {

  constructor() { }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public saveLoggedUser(idLoggedUser: number){
    window.sessionStorage.removeItem("loggedUser");
    window.sessionStorage.setItem("loggedUser",idLoggedUser.toString());
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public getLoggedUser(): string{
    return sessionStorage.getItem("loggedUser");
  }
}