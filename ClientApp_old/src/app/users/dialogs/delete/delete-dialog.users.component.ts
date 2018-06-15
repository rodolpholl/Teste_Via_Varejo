import { Component, Inject } from '@angular/core';
import { UserService } from '../../service/users.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-dialog-users',
  templateUrl: './delete-dialog.users.component.html',
  styleUrls: ['./delete-dialog.users.component.scss']
})
export class DeleteDialogUsersComponent  {

  constructor(public dialogRef: MatDialogRef<DeleteDialogUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: UserService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
  
    confirmDelete(): void {
      this.dataService.deleteUser(this.data.id);
    }

}
