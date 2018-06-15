import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AmigoModel } from "../models/amigo";
import { Observable } from "rxjs";



@Injectable()
export class DistanciasService {

    constructor(private http: HttpClient) { }

    private BaseURL = "https://localhost:44393/api/Distancia";

    getListaAmigos(id: string): Observable<AmigoModel[]> {

         return this.http.get<AmigoModel[]>(`${this.BaseURL}/GetListaAmigos/${id}`);

    }

    getAmigosProximos(id: number, qtd: number): Observable<AmigoModel[]>{
        return this.http.get<AmigoModel[]>(`${this.BaseURL}/GetAmigosProximos/${id}/${qtd}`)
    }



}