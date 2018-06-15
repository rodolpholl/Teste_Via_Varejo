import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AmigoModel } from '../../../models/amigo';
import { AmigoService } from '../../amigos.service';

@Component({
  selector: 'app-add-amigo',
  templateUrl: './add-amigo.component.html',
  styleUrls: ['./add-amigo.component.css']
})
export class AddAmigoComponent  {

  constructor(public dialogRef: MatDialogRef<AddAmigoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AmigoModel,
    public amigoService: AmigoService) { }

  formControl = new FormControl('', [
    Validators.required

  ]);
    
  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo obrigatório!' :
    '';
  }

  submit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  
  confirmAdd(): void {
    this.amigoService.addAmigo(this.data);
  }

}
