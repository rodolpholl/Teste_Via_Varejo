import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserModel } from "../models/user";
import { BehaviorSubject } from "rxjs";



@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    private BaseURL = "https://localhost:44393/api/User";

    dataChange: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>([]);
    // Temporarily stores data from dialogs
    dialogData: any;

    get data(): UserModel[] {
        return this.dataChange.value;
    }

    getDialogData() {
        return this.dialogData;
    }

    getUsersList(): void {
        this.http.get<UserModel[]>(`${this.BaseURL}`).subscribe(data => {
            this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
        });
    }

    addUser(user: UserModel): void{

        this.http.post<UserModel>(this.BaseURL,user).subscribe(data => {
            this.dialogData = data;
        },
        (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
        });
    }

    editUser(user: UserModel){
        this.http.put<UserModel>(this.BaseURL,user).subscribe(data => {
            this.dialogData = data;
            
        },
        (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
        });
    }

    deleteUser(id: number){
    
        this.http.get<UserModel>(`${this.BaseURL}/Desativar/${id}`).subscribe(data => {
            this.dialogData = data;
        },
        (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
        });
    }

}