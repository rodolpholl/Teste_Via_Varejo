import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FormsModule } from '@angular/forms';

import { AppRoutingModule, routingComponents } from './core/app-routing.module';
import { AppComponent } from './app.component';
import { CustomMaterialModule } from './core/material.module';
import { AuthService } from './core/auth.service';
import { TokenStorage } from './core/token.storage';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Interceptor } from './core/Interceptor';
import { ErrorDialogComponent } from './core/error-dialog.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { UserService } from './users/users.service';
import { AddUserComponent } from './users/dialog/add-user/add-user.component';
import { EditUserComponent } from './users/dialog/edit-user/edit-user.component';
import { DeleteUserComponent } from './users/dialog/delete-user/delete-user.component';
import { AmigosComponent } from './amigos/amigos.component';
import { AddAmigoComponent } from './amigos/dialogs/add-amigo/add-amigo.component';
import { EditAmigoComponent } from './amigos/dialogs/edit-amigo/edit-amigo.component';
import { DeleteAmigoComponent } from './amigos/dialogs/delete-amigo/delete-amigo.component';
import { AmigoService } from './amigos/amigos.service';






@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ErrorDialogComponent,
    MainLayoutComponent,
    AddUserComponent,
    EditUserComponent,
    DeleteUserComponent,
    AddAmigoComponent,
    EditAmigoComponent,
    DeleteAmigoComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CustomMaterialModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  entryComponents: [
    ErrorDialogComponent,
    AddUserComponent,
    EditUserComponent,
    DeleteUserComponent,
    AddAmigoComponent,
    EditAmigoComponent,
    DeleteAmigoComponent  
  ],
  providers: [ErrorDialogComponent, AuthService, TokenStorage, UserService, AmigoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
