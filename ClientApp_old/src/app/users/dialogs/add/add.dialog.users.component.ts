import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../../models/User';
import { UserService } from '../../service/users.service';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'add-dialog-users',
  templateUrl: './add.dialog.users.component.html',
  styleUrls: ['./add.dialog.users.component.scss']
})
export class AddDialogUsersComponent {

  constructor(public dialogRef: MatDialogRef<AddDialogUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    public dataService: UserService) { }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo Obrigatório' :  '';
  }

  submit() {
  // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.dataService.addUser(this.data);
  }

}
