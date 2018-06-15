import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserModel } from '../../../models/user';
import { UserService } from '../../users.service';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent  {

  constructor(public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserModel,
    public userService: UserService) { }


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
  
    public confirmAdd(): void {
      this.userService.addUser(this.data);
    }

}
