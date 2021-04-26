/*
import { Component } from '@angular/core';

@Component({ templateUrl: 'upload.component.html' })
export class UploadComponent {
    user: User;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }
}
*/

import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { SignedURL, User } from '@app/_models';
import { AccountService } from '@app/_services';
import { SignedURLService } from '@app/_services';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'upload.component',
  templateUrl: './upload.component.html',
  providers: [
    AccountService,
    SignedURLService
]
})
export class UploadComponent {

  uploader:FileUploader;
  hasBaseDropZoneOver:boolean;
  hasAnotherDropZoneOver:boolean;
  response:string;
  user: User;

  // Variable used to hide/show button for uploading files
  public isButtonVisible = true;

  constructor (private accountService: AccountService, private signedurlService: SignedURLService){
    this.user = this.accountService.userValue;
    this.uploader = new FileUploader({
      //url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      method: 'PUT',
      headers: [{ name: 'Content-Type', value: 'application/octet-stream'}],
      //allowedFileType: ['.gltf', '.glb', 'pdf'],
      formatDataFunction: async (item) => {
        return new Promise( (resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });

    /*
    this.uploader.onBeforeUploadItem = (fileItem: any) => {
      // logic of connecting url with the file
      const fileName = fileItem.file.name.replace(/\.[^/.]+$/, "");
      this.signedurlService.getSignedURL(this.user.username, fileName)
        .subscribe(
          data => {
            console.log('SignedURL: ' + data.signedURL);
            fileItem.url = data.signedURL;
            return {fileItem};
        }
      );
    };
    */

    this.uploader.onAfterAddingFile = (fileItem) => { 
      if (fileItem.file.name.includes('.gltf') || fileItem.file.name.includes('.glb')) {
        // The upload and uploadAll buttons are hidden upon generating signed URLs
        // This is to avoid upload error whenthe buttons are clicked to early
        this.isButtonVisible = false;
        // To avoid CORS preflight error: "credentials flag is true but access-control-allow-credentials is not true"
        fileItem.withCredentials = false; 
        // Generate signed URL to be used for the models
        const fileName = fileItem.file.name.replace(/\.[^/.]+$/, "");
        this.signedurlService.getSignedURL(this.user.username, fileName)
          .subscribe(
            data => {
              console.log('SignedURL: ' + data.signedURL);
              fileItem.url = data.signedURL;
              this.isButtonVisible = true;
              return {fileItem};
          }
        );
      } else {
        fileItem.remove();
        return;
      }
    };

    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.response = '';

    this.uploader.response.subscribe( res => this.response = res );
  }

  /*
  public generateSignedURL(item) {
    // Remove file ending (.gltf and .glb)
    const fileName = item.file.name.replace(/\.[^/.]+$/, "");
    console.log(fileName);
    console.log(this.user.username);
    this.signedurlService.getSignedURL(this.user.username, fileName)
      .subscribe(
        data => {
          console.log('SignedURL: ' + data.signedURL);
          this.uploader.setOptions({ url: data.signedURL });
          item.upload()
      }
    );
  }
  */

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
}
