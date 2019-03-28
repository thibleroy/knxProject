import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OnsenModule } from 'ngx-onsenui';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MainComponent } from './main.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
    declarations: [MainComponent],
    imports: [BrowserModule,
        OnsenModule,
        AppRoutingModule],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class MainModule { }
