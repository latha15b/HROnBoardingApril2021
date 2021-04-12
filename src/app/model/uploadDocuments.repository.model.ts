import { Injectable } from "@angular/core";
import { Observable, ObservableLike } from 'rxjs';
import { UploadDocuments } from "./uploadDocuments.model";
//import { StaticDataSource } from "./static.datasource";
import { UploadDocumentsRestDataSource } from "./uploadDocuments.rest.datasource";
import { RatingLevel } from "./ratingLevel.model";
import { State } from './state.model';
import { UploadDocumentType } from "./uploadDocumentType.model";

@Injectable()
export class UploadDocumentsModel
{
    private uploadDocuments: UploadDocuments[] = new Array<UploadDocuments>();
    private locator = (p: UploadDocuments, uploadDocumentsId: number) => p.uploadDocumentId == uploadDocumentsId;
    private uploadDocumentType: UploadDocumentType[] = new Array<UploadDocumentType>();

    constructor(private dataSource: UploadDocumentsRestDataSource) 
    {
        //this.UploadDocuments = new Array<UploadDocuments>();
        //this.dataSource.getData().forEach(p => this.UploadDocuments.push(p));
        this.dataSource.getData().subscribe(data => this.uploadDocuments = data);
        
    }

    getUploadDocuments(): UploadDocuments[]
    {
        return this.uploadDocuments;
    }

    getAllDocumentTypes(): UploadDocumentType[]
    {
        this.uploadDocumentType = [];
        this.dataSource.getAllDocumentTypes().subscribe(p => this.uploadDocumentType.push(...p));
        console.log("rar" + this.uploadDocumentType);
        return this.uploadDocumentType;

    }
    getUploadDocumentsByEmployeeId(id: number): Observable<UploadDocuments[]>
    {
        return this.dataSource.getUploadDocumentsByEmployeeId(id);
    }
    saveUploadDocuments(file: File,up: UploadDocuments) : Observable<UploadDocuments[]>
    {
        // Make http post request over api 
        // with formData as req 
        return this.dataSource.saveUploadDocuments(file, up);
    }

    submitUploadDocuments(id: number): Observable<UploadDocuments[]>
    {
        return this.dataSource.submitUploadDocuments(id);
    }

    deleteUploadDocuments(uploadDocumentsId: number)
    {
        let index = this.uploadDocuments.findIndex(edu => this.locator(edu, uploadDocumentsId));
        if(index > -1)
        {
            this.uploadDocuments.splice(index, 1);
        }
    }

}
