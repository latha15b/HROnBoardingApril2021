import { Component, Inject, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { OtherProfessionalDetails } from "../model/otherProfessionalDetails.model";
import { OtherProfessionalDetailsModel } from "../model/otherProfessionalDetails.repository.model";
import { MODES, SharedState, SHARED_STATE } from "./sharedState.model";
import { Observable } from "rxjs";
import { Observer } from "rxjs";
import { Router } from "@angular/router";
import { timestamp } from 'rxjs/operators';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { UploadDocumentType } from "../model/uploadDocumentType.model"
import { UploadDocumentsModel } from "../model/uploadDocuments.repository.model";
import { UploadDocuments } from "../model/uploadDocuments.model";
import { HttpClient } from "@angular/common/http";
import { ElementRef } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";


@Component({
    selector: "udForm",
    templateUrl: "uploadDocuments.component.html",
    styleUrls: ["uploadDocuments.component.scss"]
})

export class UploadDocumentsComponent
{
    uploadDocuments: UploadDocuments = new UploadDocuments();
    uploadDocumentsList: UploadDocuments[] = new Array<UploadDocuments>();

    uploadDocumentTypes: UploadDocumentType[] = new Array<UploadDocumentType>();
    editing: boolean = false;
    personalEmployeeId: number = 0;
    fileToUpload: File = null;  
    //file:any;
    fileName: string;
    file: File;
    dataSource: any;
    displayedColumns: string[] = ['fileName', 'documentTypeName'];
    columnsToDisplay: string[] = ['fileName', 'documentTypeName'];
    displayTable: boolean = false;
    validatedDeclaration: boolean = false;
    href: string = "";
    isSummaryPage: boolean = false;

    @ViewChild('inputFile') myInputVariable: ElementRef;


      
    constructor(private model: UploadDocumentsModel,
        private router: Router,private http: HttpClient,)
        {
            this.uploadDocumentTypes = model.getAllDocumentTypes();
            // this should be created in the Login Component
        }

        ngOnInit(): void 
        {
            this.href = this.router.url;
            console.log("URL " + this.href);
            if(this.href == "/form/summaryDetails")
            {
                this.isSummaryPage = true;
            }
            else
            {
                this.isSummaryPage = false;
            }
            
            if(sessionStorage.getItem("PersonalDetailsEmployeeId"))
            {
                this.editing = false;

                this.personalEmployeeId = Number(sessionStorage.getItem("PersonalDetailsEmployeeId"));
                this.model.getUploadDocumentsByEmployeeId(this.personalEmployeeId)
                .subscribe(data => {
                    if(data.length > 0)
                  {
                        this.editing= true;
                        this.uploadDocumentsList = data;
                        console.log(this.uploadDocumentsList);
                        this.dataSource = new MatTableDataSource<any>(this.uploadDocumentsList);
                        this.displayTable = true;
                        this.uploadDocumentsList.forEach(docList => {
                            this.uploadDocumentTypes.forEach(docType => {
                                if(docList.documentTypeId == docType.documentTypeId)
                                {
                                    docList.documentTypeName = docType.documentTypeName;
                                }
                            });
                        });
                    }
                });
                
            }
        }

        onChange(event) { 
            this.file = event.target.files[0]; 
            this.fileName = event.target.files[0].name;
        } 
      
        onUpload() { 
            console.log(this.file); 
            this.uploadDocuments.fileName = this.fileName;
            this.uploadDocuments.modifiedDate = new Date();
            this.uploadDocuments.personalDetailEmployeeId = this.personalEmployeeId;
            this.model.saveUploadDocuments(this.file,this.uploadDocuments)
            .subscribe(data => {
                  this.uploadDocumentsList = data;
                  console.log(this.uploadDocumentsList);
                    this.dataSource = new MatTableDataSource<any>(this.uploadDocumentsList);
                    this.displayTable = true;
                    this.uploadDocumentsList.forEach(docList => {
                        this.uploadDocumentTypes.forEach(docType => {
                            if(docList.documentTypeId == docType.documentTypeId)
                            {
                                docList.documentTypeName = docType.documentTypeName;
                            }
                        });
                     });
                });
                
            this.reset();
        } 

        reset() {
            this.myInputVariable.nativeElement.value = null;
            this.file = null;
            this.fileName = '';
        }
      
        removeFile() {
          this.file = null;
          this.fileName = '';
          
        }
        submitForm(form: NgForm)
        {
            if(form.valid)
            {
                this.model.submitUploadDocuments(this.personalEmployeeId);
                this.router.navigateByUrl("/form/summaryDetails");
            }
        }
       
        getOtherDetailsUD()
        {
                this.router.navigateByUrl("/form/otherProfessionalDetails");
        }
        resetForm()
        {
            this.uploadDocuments = new UploadDocuments();
        }

        // onSelectFile(file: FileList) {  
        //     this.fileToUpload = file.item(0);  
        //     var reader = new FileReader();  
        //     reader.onload = (event: any) => {  
        //        // console.log(event.target.result);  
        //     }  
        //     reader.readAsDataURL(this.fileToUpload);  
        // } 
        // fileChange(files:any[]) {

        //     if (files && files.length > 0) {
        //      let file = files[0];
        //      let formData = new FormData();
        //      formData.append('file', file);
             
        //      this.uploadDocuments.fileName = this.fileName;
        //      this.uploadDocuments.modifiedDate = new Date();
        //      this.uploadDocuments.personalDetailEmployeeId = this.personalEmployeeId;
        //      this.uploadDocuments.fileContent = file;
 
        //      //this.model.saveUploadDocuments(this.uploadDocuments);
        //      //this.httpClient.post(url,formData).subscribe(res => console.log('File Uploaded ...');
        //     }  
        
        //   }
      
        // onChange1(file) {
        //   this.file = file.files[0];
        //   this.fileName = file.files[0].name;
        // }

         // uploadDocument() {

        //     this.uploadDocuments.fileName = this.fileName;
        //     this.uploadDocuments.modifiedDate = new Date();
        //     this.uploadDocuments.personalDetailEmployeeId = this.personalEmployeeId;
        //     let fileReader = new FileReader();
        //     fileReader.onload = (e) => {
        //       console.log(fileReader.result);
        //     }
        //    var fileinpu = fileReader.readAsDataURL(this.file);
        //     this.uploadDocuments.fileContent = this.file.arrayBuffer;

        //    // this.model.saveUploadDocuments(this.uploadDocuments);
        //     // let fileReader = new FileReader();
        //     // fileReader.onload = (e) => {
        //     //   console.log(fileReader.result);
        //     // }
        //     // fileReader.readAsBinaryString(this.file);
        //     // console.log(this.file);
        // }

}