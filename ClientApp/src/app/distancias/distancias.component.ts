import { Component, OnInit } from '@angular/core';
import { DistanciasService } from './distancias.service';
import { AmigoModel } from '../models/amigo';
import { TokenStorage } from '../core/token.storage';
import { HttpClient } from '@angular/common/http';
import { marker } from '../models/markers';



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
  idAmigoSelecionado: number;
  amigoSelecionado: marker;
  markers: marker[] = [];
  



  ngOnInit() {

    this.distanciaService.getListaAmigos(this.token.getLoggedUser()).subscribe(data => {

      this.listAmigos = data;

    });

  }

  getAmigosProximos() {

    let amigoSelect = this.listAmigos.find(x => x.id === this.idAmigoSelecionado);

    this.amigoSelecionado =   {
        lat: parseFloat(amigoSelect.latitude),
        lng: parseFloat(amigoSelect.longitude),
        label: amigoSelect.nome,
        draggable: false
    }

    this.distanciaService.getAmigosProximos(this.idAmigoSelecionado, 3).subscribe(data => {

      this.listAmigosProximos = data;
      
      this.markers = [];
      


      for (let amigo of data){
        this.markers.push({
          lat: parseFloat(amigo.latitude),
          lng: parseFloat(amigo.longitude),
          label: amigo.nome,
          draggable: false
        });
      }
      
      


      
    })

    

  }

}
