import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { User } from '@app/_models';
import { AccountService, AlertService, SignedURLService } from '@app/_services';

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

  constructor (
    private accountService: AccountService, 
    private signedurlService: SignedURLService,
    private alertService: AlertService
  ){
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

    this.uploader.onAfterAddingFile = (fileItem) => { 
      if (fileItem.file.name.includes('.gltf') || fileItem.file.name.includes('.glb')) {
        // Remove error message
        this.alertService.clear();
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
              fileItem.url = data.signedURL;
              this.isButtonVisible = true;
              return {fileItem};
          }
        );
      } else {
        // Remove the file item from the queue so that it cannot be uploaded
        fileItem.remove();
        // Display an error message on the screen
        this.alertService.error('Only .gltf or .glb files can be uploaded!');
        return;
      }
    };

    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.response = '';

    this.uploader.response.subscribe( res => this.response = res );
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
}
