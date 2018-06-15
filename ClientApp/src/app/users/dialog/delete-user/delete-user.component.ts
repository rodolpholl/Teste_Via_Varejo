import { Component, Inject } from '@angular/core';
import { UserModel } from '../../../models/user';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserService } from '../../users.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent  {

  constructor(public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserModel, public userService: UserService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
  
    confirmDelete(): void {
      this.userService.deleteUser(this.data.id);
    }

}
