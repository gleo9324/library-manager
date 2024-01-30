import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { BrowsePagesComponent } from './components/browse-pages/browse-pages.component';
import { DefaultButtonComponent } from './components/default-button/default-button.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { SvgComponent } from './components/svg/svg.component';
import { ActionIconComponent } from './components/action-icon/action-icon.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { FilterComponent } from './components/filter/filter.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    TableComponent,
    BrowsePagesComponent,
    DefaultButtonComponent,
    RadioButtonComponent,
    SvgComponent,
    ActionIconComponent,
    HomeComponent,
    DropdownComponent,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InlineSVGModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
