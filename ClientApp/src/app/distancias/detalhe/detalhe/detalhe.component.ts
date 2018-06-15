import { Component, Input, OnInit } from '@angular/core';
import { AmigoModel } from '../../../models/amigo';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent  {

  constructor() { }

  displayedColumns = ['position','nome', 'latitude', 'longitude'];
  @Input() listAmigosProximos: AmigoModel[]

  

}
