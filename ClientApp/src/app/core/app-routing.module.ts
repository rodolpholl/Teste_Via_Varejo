import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UsersComponent } from '../users/users.component';
import { AmigosComponent } from '../amigos/amigos.component';
import { DistanciasComponent } from '../distancias/distancias.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent },
  { path: 'amigos', component: AmigosComponent },
  { path: 'distancias', component: DistanciasComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, UsersComponent, AmigosComponent, DistanciasComponent]

