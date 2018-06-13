import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import { FileSelectDirective, FileUploader,FileUploadModule, FileItem} from 'ng2-file-upload';
import { AlertsService } from 'angular-alert-module';
import { Http, Response } from '@angular/http';


@Injectable()

export class FileService {

    constructor(private _http:HttpClient,private alerts:AlertsService,private http: HttpClient){}

    downloadFile(file:String){
        var body = {filename:file};

        return this._http.post('http://localhost:3000/file/download',body,{
            responseType : 'blob',
            headers:new HttpHeaders().append('Content-Type','application/json')
        });
    }

    uploadFiles():Observable<File[]>
    {    
    
        return this.http.get<File[]>("../UploadedFiles/");
    }

}