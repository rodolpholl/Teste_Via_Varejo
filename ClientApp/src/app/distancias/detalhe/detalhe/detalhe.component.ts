import { Component, Input, OnInit } from '@angular/core';
import { AmigoModel } from '../../../models/amigo';
import { marker } from '../../../models/markers';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent  {

  constructor() { }

  displayedColumns = ['position','nome', 'latitude', 'longitude'];
  @Input() listAmigosProximos: AmigoModel[];
  @Input() markers: marker[];
  @Input() amigoSelecionado: marker;


  

}
