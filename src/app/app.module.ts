import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './app.material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { FusionChartsModule } from 'angular-fusioncharts';

// Import FusionCharts library and chart modules
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FusionCharts from "fusioncharts";
import * as Widgets from "fusioncharts/fusioncharts.widgets.js";
import * as Gantt from "fusioncharts/fusioncharts.gantt.js";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";


import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { AuthGuard } from './service/auth.guard';
import { LoginService } from './service/login.service';

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, Widgets, Gantt, FusionTheme,Charts);


const appRoutes: Routes = [
  { path: '', redirectTo:'/start-page',  pathMatch: 'full'},
  { path: 'start-page', component: FirstPageComponent,
    canActivate:[AuthGuard],
    children:[
      { path: '' , component: MainPageComponent },
    ]},
  { path: 'app-login' , component: LoginComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    FirstPageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FusionChartsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbModule.forRoot()
  ],
  exports:[
    MaterialModule,
    FusionChartsModule,
    HttpClientModule
  ],
  providers: [DatePipe,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
