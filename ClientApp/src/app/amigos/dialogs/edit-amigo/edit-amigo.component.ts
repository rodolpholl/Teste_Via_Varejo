import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AmigoModel } from '../../../models/amigo';
import { AmigoService } from '../../amigos.service';

@Component({
  selector: 'app-edit-amigo',
  templateUrl: './edit-amigo.component.html',
  styleUrls: ['./edit-amigo.component.css']
})
export class EditAmigoComponent  {

  constructor(public dialogRef: MatDialogRef<EditAmigoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AmigoModel, public amigoService: AmigoService) { }

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

    stopEdit(): void {
      this.amigoService.editAmigo(this.data);
      
      this.dialogRef.close();
    }

}
