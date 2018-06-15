import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AmigoModel } from "../models/amigo";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class AmigoService {

    constructor(private http: HttpClient) { }

    private BaseURL = "https://localhost:44393/api/Amigo";

    dataChange: BehaviorSubject<AmigoModel[]> = new BehaviorSubject<AmigoModel[]>([]);
    // Temporarily stores data from dialogs
    dialogData: any;

    get data(): AmigoModel[] {
        return this.dataChange.value;
    }
    
    getDialogData() {
        return this.dialogData;
    }

    getAmigosList(): void {
        this.http.get<AmigoModel[]>(`${this.BaseURL}`).subscribe(data => {
            this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
        });
    }

    addAmigo(amigo: AmigoModel): void{

        this.http.post<AmigoModel>(this.BaseURL,amigo).subscribe(data => {
            console.log("retorno: "+ JSON.stringify(data));
            this.dialogData = data;
        },
        (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
        });
    }

    editAmigo(amigo: AmigoModel){
        this.http.put<AmigoModel>(this.BaseURL,amigo).subscribe(data => {
                
            this.dialogData = data;
            
            
        },
        (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
        });
    }

    deleteAmigo(id: number){
    
        this.http.delete<AmigoModel>(`${this.BaseURL}/${id}`).subscribe(data => {
            this.dialogData = data;
        },
        (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
        });
    }

}