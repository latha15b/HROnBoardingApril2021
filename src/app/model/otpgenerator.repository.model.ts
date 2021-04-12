import { Injectable } from "@angular/core";
import { stringify } from "querystring";
import { Observable } from 'rxjs';
import { OtpGenerator } from "./otpgenerator.model";
import { OtpgeneratorRestDatasource } from "./otpgenerator.rest.datasource";

@Injectable()
export class OtpGeneratorsModel
{
    private otpGenerator: OtpGenerator[] = new Array<OtpGenerator>();
    private locator = (p: OtpGenerator, otpId: number) => p.OtpId == otpId;

    constructor(private dataSource: OtpgeneratorRestDatasource) 
    {
        //this.personaldetails = new Array<PersonalDetails>();
        //this.dataSource.getData().forEach(p => this.personaldetails.push(p));
        this.dataSource.getData().subscribe(data => this.otpGenerator = data);
        
    }

    getOtpGenerators(): OtpGenerator[]
    {
        return this.otpGenerator;
    }

    getOtpGeneratorsByOtpCode(otpcode: number): Observable<Boolean>
    {
        return this.dataSource.getDataByOtpCode(otpcode);
    }
    getOtpGeneratorsByTimeoutTime(otpcode: number): Observable<Boolean>
    {
        return this.dataSource.getDataByTimeOutTime(otpcode);
    }
    getDataByEmailId(emailId: string): Observable<OtpGenerator>
    {
        return this.dataSource.getDataByEmailId(emailId);
    }
    saveOtpGenerators(otpGenerator: OtpGenerator)
    {
        if(otpGenerator.EmailId != null)
        {
            this.dataSource.saveOtpGenerators(otpGenerator).subscribe(p => this.otpGenerator.push(p));
        }
       
    }
    updateOtpGenerators(otpGenerator: OtpGenerator)
    {
        if(otpGenerator.EmailId != null)
        {
            this.dataSource.updateOtpGenerators(otpGenerator).subscribe(p => this.otpGenerator.push(p));
        }
       
    }

    deleteOtpGenerators(otpId: number)
    {
        let index = this.otpGenerator.findIndex(p => this.locator(p, otpId));
        if(index > -1)
        {
            this.otpGenerator.splice(index, 1);
        }
    }

}
