import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './app.material';

import { FusionChartsModule } from 'angular-fusioncharts';

// Import FusionCharts library and chart modules
import * as FusionCharts from 'fusioncharts';
import * as charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { Column2dComponent } from './column2d/column2d.component';
import { LineComponent } from './line/line.component';
import { Mscolumn2dComponent } from './mscolumn2d/mscolumn2d.component';
import { RouterModule, Routes } from '@angular/router';

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);

const appRoutes: Routes = [
  { path: 'app-column2d', component: Column2dComponent},
  { path: 'app-line', component: LineComponent},
  { path: 'app-mscolumn2d', component: Mscolumn2dComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    Column2dComponent,
    LineComponent,
    Mscolumn2dComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FusionChartsModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports:[
    MaterialModule,
    FusionChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
