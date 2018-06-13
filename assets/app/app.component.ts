import { Component } from '@angular/core';
import { FileSelectDirective, FileUploader,FileUploadModule, FileItem} from 'ng2-file-upload';
import { FileService } from './file.service';
import {saveAs} from 'file-saver';
import { AlertsService } from 'angular-alert-module';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const _url = 'http://localhost:3000/file/upload';
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers:[FileService]
})
export class AppComponent {

    uploader:FileUploader = new FileUploader({url:_url});

    attachmentList:any = [];
     toUpload :Array<FileItem>;
     navItems :Observable<Response>;
     Items = [];
      err:string;
      constructor(private _fileService:FileService,private alerts:AlertsService,private http: HttpClient){


        //this.http.get("../UploadedFiles/").subscribe(data=> this.navItems = data);
        

       this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {

           this.attachmentList.push(JSON.parse(response));
       }
   }
ngOnInit()
{
   // this._fileService.uploadFiles() .subscribe(data => { this.Items = data });

console.log('Items : ',this.Items);

}
   
    
    download(index){
        var filename = this.attachmentList[index].uploadname;
        

        this._fileService.downloadFile(filename)
        .subscribe(
            data => saveAs(data, filename),
            error => this.err=error
            
        );

        if(this.err){
            this.alerts.setMessage('ERROR : File Not Downloaded','error');
        }
        else
            {this.alerts.setMessage('File Downloaded Successful','success');}
        
    }

  

    removeItem(item:FileItem){
        this.alerts.setMessage('Item Removed From Queue','warn');
        console.log('Before Removing',this.uploader.queue.length);
        this.uploader.removeFromQueue(item);
        console.log('After Removing',this.uploader.queue.length);
        
    }


    uploadItem(item:FileItem)
    {
        
        if(! (item._file.size > 1000000))
            { this.uploader.uploadItem(item);
             this.alerts.setMessage('File Uploaded Successfully','success');}
        else
           {this.alerts.setMessage('ERROR : File Size Greater Than 1 MB','error');
            this.uploader.removeFromQueue(item);}
    }

}