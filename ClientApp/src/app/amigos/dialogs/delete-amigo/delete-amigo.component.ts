import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AmigoModel } from '../../../models/amigo';
import { AmigoService } from '../../amigos.service';

@Component({
  selector: 'app-delete-amigo',
  templateUrl: './delete-amigo.component.html',
  styleUrls: ['./delete-amigo.component.css']
})
export class DeleteAmigoComponent  {

  constructor(public dialogRef: MatDialogRef<DeleteAmigoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AmigoModel,
    public amigoService: AmigoService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
  
    confirmDelete(): void {
      this.amigoService.deleteAmigo(this.data.id);
    }

}
