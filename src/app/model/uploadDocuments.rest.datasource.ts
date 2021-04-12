import { Injectable, Inject, InjectionToken } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { UploadDocuments } from "./uploadDocuments.model";
import { catchError } from "rxjs/operators";
import { RatingLevel } from "./ratingLevel.model";
import { UploadDocumentType } from "./uploadDocumentType.model";
import { NgForm } from "@angular/forms";

export const REST_URL_UD = new InjectionToken("rest_url");

@Injectable()
export class UploadDocumentsRestDataSource
{
    constructor(private http: HttpClient,@Inject(REST_URL_UD) private url: string) {}
    
    getData(): Observable<UploadDocuments[]> 
    {
        return this.sendRequest<UploadDocuments[]>("GET",this.url);
    }
    getAllDocumentTypes(): Observable<UploadDocumentType[]>
    {
        console.log(this.url+"/GetAllDocumentType/");
        return this.sendRequestRatingLevel<UploadDocumentType[]>("GET",this.url+"/GetAllDocumentType/")
    }
    getUploadDocumentsByEmployeeId(id: number): Observable<UploadDocumentType[]>
    {
        console.log(this.url+"/GetUploadDocumentsByEmployeeId/");
        return this.sendRequest<UploadDocumentType[]>("GET", `${this.url}/${id}`);
    }
    saveUploadDocuments(file: File,up: UploadDocuments):Observable<UploadDocuments[]>
    {   
       var data = [];
        let headers = new HttpHeaders({
            //'Content-Type': undefined,
            'Accept': '*/*',
            'Host': 'https://localhost:5001/',
            'Content-Length': '300000'
         });
         let options = {
            headers: headers
         }
        console.log(this.url);    
        const formData: FormData = new FormData();  
        formData.append('uploadFile', file, file.name); 
        //data.push({'uploadFile': file, 'DocId' : up.documentTypeName, 'PersonalEmployeeId': up.personalDetailEmployeeId})
        formData.append('DocumentTypeId',up.documentTypeName); 
        formData.append('PersonalDetailEmployeeId',up.personalDetailEmployeeId.toString());

        return this.http.post<UploadDocuments[]>(this.url,formData, options);
          
    }
    
    submitUploadDocuments(id: number): Observable<UploadDocumentType[]>
    {
        console.log(this.url+"/SubmitUploadDocuments/");
        return this.sendRequest<UploadDocumentType[]>("POST", `${this.url}/${id}`);
    }
    
    // submitDoucuments(id: number): Observable<UploadDocuments> 
    // {   
    //     var data = [];
    //     let headers = new HttpHeaders({
    //         //'Content-Type': undefined,
    //         'Accept': '*/*',
    //         'Host': 'https://localhost:5001/',
    //         'Content-Length': '300000'
    //      });
    //      let options = {
    //         headers: headers
    //      }

    //     return this.http.post<UploadDocuments[]>(this.url,id, options);
      
    //     //return this.sendRequest<UploadDocuments>("POST",`${this.url}/${id}`);
    // }
    updateUploadDocuments(uploadDocuments: UploadDocuments): Observable<UploadDocuments>
    {
        return this.sendRequest<UploadDocuments>("PUT", `${this.url}/${uploadDocuments.uploadDocumentId}`, uploadDocuments);
    }

    deleteUploadDocuments(id: number): Observable<UploadDocuments>
    {
        return this.sendRequest<UploadDocuments>("DELETE", `${this.url}/${id}`);
    }

    private sendRequest<T>(verb: string, url: string, body?: UploadDocuments) : Observable<T>
    {
        // let myHeaders = new HttpHeaders();
        // myHeaders = myHeaders.set("Access-Key", "<secret>");
        // myHeaders = myHeaders.set("Application-Names", ["Contacts", "ProAngular"]);

        return this.http.request<T>(verb, url, { 
            body: body
            //,
            //headers: myHeaders
        }).pipe(catchError((error: Response) => 
            throwError(`NetworkError: ${error.statusText} (${error.status})`)));
    }
    private sendRequestRatingLevel<T>(verb: string, url: string, body?: RatingLevel) : Observable<T>
    {
        // let myHeaders = new HttpHeaders();
        // myHeaders = myHeaders.set("Access-Key", "<secret>");
        // myHeaders = myHeaders.set("Application-Names", ["Contacts", "ProAngular"]);

        return this.http.request<T>(verb, url, { 
            body: body
            //,
            //headers: myHeaders
        }).pipe(catchError((error: Response) => 
            throwError(`NetworkError: ${error.statusText} (${error.status})`)));
    }

    private sendRequestCreate<T>(verb: string, url: string, body?: FormData) : Observable<T>
    {
        // let myHeaders = new HttpHeaders();
        // myHeaders = myHeaders.set("Access-Key", "<secret>");
        // myHeaders = myHeaders.set("Application-Names", ["Contacts", "ProAngular"]);
        // let headers = new HttpHeaders({
        //     'Content-Type': 'application/json'
        //  });
        //  let options = {
        //     headers: headers
        //  }
        return this.http.request<T>(verb, url, { 
            body: body
            // ,
            // headers: headers
        }).pipe(catchError((error: Response) => 
            throwError(`NetworkError: ${error.statusText} (${error.status})`)));
    }
}