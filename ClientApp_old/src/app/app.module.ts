import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatMenuModule, MatSidenavModule, MatListModule, MatSortModule, MatTableModule, MatInputModule, MatDialogModule, MatPaginatorModule } from '@angular/material';



import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { AddDialogUsersComponent } from './users/dialogs/add/add.dialog.users.component';
import { EditDialogUsersComponent } from './users/dialogs/edit/edit-dialog-users.component';
import { DeleteDialogUsersComponent } from './users/dialogs/delete/delete-dialog.users.component';
import { UsersComponent } from './users/users.component';
import { UserService } from './users/service/users.service';


const appRoutes: Routes = [

  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path:'users', component: UsersComponent },
  
  
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    AddDialogUsersComponent,
    EditDialogUsersComponent,
    DeleteDialogUsersComponent,
    UsersComponent,
    

    RouterModule.forRoot(
       appRoutes       
    )
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
