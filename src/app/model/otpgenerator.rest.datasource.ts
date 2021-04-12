import { Injectable, Inject, InjectionToken } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { OtpGenerator } from "./otpgenerator.model";
import { catchError } from "rxjs/operators";

export const REST_URL_OTP = new InjectionToken("rest_url");

@Injectable()
export class OtpgeneratorRestDatasource {
    constructor(private http: HttpClient,@Inject(REST_URL_OTP) private url: string) {}
    
    getData(): Observable<OtpGenerator[]> 
    {
        return this.sendRequest<OtpGenerator[]>("GET",this.url);
    }
    getDataByOtpCode(id: number): Observable<Boolean> 
    {
        console.log(id + this.url);
        return this.sendRequest<Boolean>("POST",`${this.url}/${id}`);
    }
    getDataByTimeOutTime(id: number): Observable<Boolean> 
    {
        return this.sendRequest<Boolean>("GET",`${this.url}/${id}`);
    }
    getDataByEmailId(emailId: string): Observable<OtpGenerator>
    {
        console.log(this.url+"/GetOtpGeneratorByEmailId/"+emailId);
        return this.sendRequest<OtpGenerator>("GET",this.url+"/GetOtpGeneratorByEmailId/"+emailId);
    }
    saveOtpGenerators(otpgenerator: OtpGenerator) : Observable<OtpGenerator> 
    {   
        return this.sendRequest("POST",this.url, otpgenerator);
    }

    updateOtpGenerators(otpgenerator: OtpGenerator): Observable<OtpGenerator>
    {
        console.log(otpgenerator);       
        return this.sendRequest<OtpGenerator>("PUT", `${this.url}/${otpgenerator.OtpId}`, otpgenerator);
    }

    deleteOtpgenerators(id: number): Observable<OtpGenerator>
    {
        return this.sendRequest<OtpGenerator>("DELETE", `${this.url}/${id}`);
    }

    private sendRequest<T>(verb: string, url: string, body?: OtpGenerator) : Observable<T>
    {
        // let myHeaders = new HttpHeaders();
        // myHeaders = myHeaders.set("Access-Key", "<secret>");
        // myHeaders = myHeaders.set("Application-Names", ["Contacts", "ProAngular"]);
        console.log(body);
        console.log(verb);
        return this.http.request<T>(verb, url, { 
            body: body
            //,
            //headers: myHeaders
        }).pipe(catchError((error: Response) => 
            throwError(`NetworkError: ${error.statusText} (${error.status})`)));
    }
   
}
