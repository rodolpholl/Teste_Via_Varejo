import { Component, OnInit } from '@angular/core';
import { DistanciasService } from './distancias.service';
import { AmigoModel } from '../models/amigo';
import { TokenStorage } from '../core/token.storage';
import { HttpClient } from '@angular/common/http';
import { DetalheComponent } from './detalhe/detalhe/detalhe.component';


@Component({
  selector: 'app-distancias',
  templateUrl: './distancias.component.html',
  styleUrls: ['./distancias.component.css']
})
export class DistanciasComponent implements OnInit {

  constructor(private distanciaService: DistanciasService,
    public httpClient: HttpClient,
    private token: TokenStorage) { }


  listAmigos: AmigoModel[] = [];
  listAmigosProximos: AmigoModel[] = [];
  amigoSelecionado: number;



  ngOnInit() {

    this.distanciaService.getListaAmigos(this.token.getLoggedUser()).subscribe(data => {

      this.listAmigos = data;

    });

  }

  getAmigosProximos() {

    this.distanciaService.getAmigosProximos(this.amigoSelecionado, 3).subscribe(data => {
      this.listAmigosProximos = data;
    })

  }

}
