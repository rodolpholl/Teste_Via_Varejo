import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { User } from '../../models/User';
import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


@Injectable()
export class UserService {

    private readonly API_URL = 'https://https://localhost:44393/api/User';

    dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

    dialogData: any;

    constructor (private httpClient: HttpClient) {}

    get data(): User[] {
        return this.dataChange.value;
    }

    getDialogData() {
        return this.dialogData;
    }

    /** Métodos do CRUD **/

    getAllUsers(): void {
        this.httpClient.get<User[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
          },
          (error: HttpErrorResponse) => {
          console.log (error.name + ' ' + error.message);
          });
      }
    
      // DEMO ONLY, you can find working methods below
      addUser (user: User): void {
        this.dialogData = user;
      }
    
      updateadUser (user: User): void {
        this.dialogData = user;
      }
    
      deleteUser(id: number): void {
        console.log(id);
      }

}