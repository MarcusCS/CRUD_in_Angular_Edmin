import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdduserComponent } from './adduser/adduser.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { ListusersComponent } from './listusers/listusers.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

const appRoutes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'adduser', component: AdduserComponent},
  {path: 'listusers',component: ListusersComponent},
  {path: 'editUser/:id',component: AdduserComponent}
]; 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    AdduserComponent,
    SidebarComponent,
    ListusersComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
