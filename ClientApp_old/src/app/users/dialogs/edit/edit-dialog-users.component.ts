import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../service/users.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-dialog-users',
  templateUrl: './edit-dialog-users.component.html',
  styleUrls: ['./edit-dialog-users.component.scss']
})
export class EditDialogUsersComponent  {

  constructor(public dialogRef: MatDialogRef<EditDialogUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dataService: UserService) { }

  formControl = new FormControl('', [
      Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo Obrigatório!' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.dataService.updateadUser(this.data);
  }

}
