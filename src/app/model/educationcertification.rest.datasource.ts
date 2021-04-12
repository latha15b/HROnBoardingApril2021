import { Injectable, Inject, InjectionToken } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { EducationCertification } from "./educationcertification.model";
import { catchError } from "rxjs/operators";

export const REST_URL_EC = new InjectionToken("rest_url");

@Injectable()
export class EducationCertificationRestDataSource
{
    constructor(private http: HttpClient,@Inject(REST_URL_EC) private url: string) {}
    
    getData(): Observable<EducationCertification[]> 
    {
        return this.sendRequest<EducationCertification[]>("GET",this.url);
    }
    getEducationCertificationByEmployeeId(personalDetailEmployeeId: number): Observable<EducationCertification[]> 
    {
        return this.sendRequest<EducationCertification[]>("GET", `${this.url}/${personalDetailEmployeeId}`);
    }
    saveEducationCertification(educationCertification: EducationCertification) : Observable<EducationCertification> 
    {   
        console.log(this.url);       
        return this.sendRequest("POST",this.url, educationCertification);
    }

    updateEducationCertification(educationCertification: EducationCertification): Observable<EducationCertification>
    {
        return this.sendRequest<EducationCertification>("PUT", `${this.url}/${educationCertification.personalDetailEmployeeId}`, educationCertification);
    }
  
    deleteEducationCertification(id: number): Observable<EducationCertification>
    {
        return this.sendRequest<EducationCertification>("DELETE", `${this.url}/${id}`);
    }

    private sendRequest<T>(verb: string, url: string, body?: EducationCertification) : Observable<T>
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
    private sendRequestCreate<T>(verb: string, url: string, body?: EducationCertification[]) : Observable<T>
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