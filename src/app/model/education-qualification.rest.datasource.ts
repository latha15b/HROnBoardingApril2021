import { Injectable, Inject, InjectionToken } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { EducationQualification } from "./EducationQualification.model";
import { catchError } from "rxjs/operators";

export const REST_URL_EQ = new InjectionToken("rest_url");

@Injectable()
export class EducationQualificationRestDataSource
{
    constructor(private http: HttpClient,@Inject(REST_URL_EQ) private url: string) {}
    
    getData(): Observable<EducationQualification[]> 
    {
        return this.sendRequest<EducationQualification[]>("GET",this.url);
    }
    saveEducationQualification(educationQualification: EducationQualification) : Observable<EducationQualification> 
    {   
        console.log(this.url);       
        return this.sendRequest("POST",this.url, educationQualification);
    }

    updateEducationQualification(educationQualification: EducationQualification): Observable<EducationQualification>
    {
        return this.sendRequest<EducationQualification>("PUT", `${this.url}/${educationQualification.personalDetailEmployeeId}`, educationQualification);
    }

    getEducationQualificationbyEmpId(id: number): Observable<EducationQualification[]>
    {
        return this.sendRequest<EducationQualification[]>("GET", `${this.url}/${id}`);
    }
    deleteEducationQualification(id: number): Observable<EducationQualification>
    {
        return this.sendRequest<EducationQualification>("DELETE", `${this.url}/${id}`);
    }

    private sendRequest<T>(verb: string, url: string, body?: EducationQualification) : Observable<T>
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
    private sendRequestCreate<T>(verb: string, url: string, body?: EducationQualification[]) : Observable<T>
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
}