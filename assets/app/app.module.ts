import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FileUploadModule} from 'ng2-file-upload';
import { AppComponent } from "./app.component";
import { AlertsModule } from 'angular-alert-module';
import { HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';

@NgModule({
    declarations: [
        AppComponent
    ],

    imports: [
        BrowserModule,
        FileUploadModule,
        HttpClientModule,
        HttpModule,
        AlertsModule.forRoot()
    
    ],

    bootstrap: [AppComponent]
})
export class AppModule {

}