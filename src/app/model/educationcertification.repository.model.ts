import { Injectable } from "@angular/core";
import { Observable, ObservableLike } from 'rxjs';
import { EducationCertification } from "./educationcertification.model";
//import { StaticDataSource } from "./static.datasource";
import { EducationCertificationRestDataSource } from "./educationcertification.rest.datasource";

@Injectable()
export class EducationCertificationModel
{
    private educationCertification: EducationCertification[] = new Array<EducationCertification>();
    private locator = (p: EducationCertification, educationCertificationId: number) => p.educationCertificationId == educationCertificationId;

    constructor(private dataSource: EducationCertificationRestDataSource) 
    {
        //this.EducationCertification = new Array<EducationCertification>();
        //this.dataSource.getData().forEach(p => this.EducationCertification.push(p));
        this.dataSource.getData().subscribe(data => this.educationCertification = data);
        
    }

    getEducationCertification(): EducationCertification[]
    {
        return this.educationCertification;
    }

    getEducationCertificationById(educationCertificationId: number): EducationCertification
    {
        return this.educationCertification.find(p => this.locator(p,educationCertificationId));
    }
    getEducationCertificationByEmployeeId(personalDetailEmployeeId: number): Observable<EducationCertification[]>
    {
        return this.dataSource.getEducationCertificationByEmployeeId(personalDetailEmployeeId);
    }
    saveEducationCertification(educationCertification: EducationCertification)
    {
        if(educationCertification.educationCertificationId == 0 || educationCertification.educationCertificationId == null)
        {
             this.dataSource.saveEducationCertification(educationCertification).subscribe(p => this.educationCertification.push(p));
        }
        else
        {
            this.dataSource.updateEducationCertification(educationCertification).subscribe(p => {
                let index = this.educationCertification.findIndex(pd => this.locator(pd, educationCertification.educationCertificationId));
                this.educationCertification.splice(index, 1, educationCertification);
            });
        }
    }

    deleteEducationCertification(educationCertificationId: number)
    {
        let index = this.educationCertification.findIndex(edu => this.locator(edu, educationCertificationId));
        if(index > -1)
        {
            this.educationCertification.splice(index, 1);
        }
    }

    private generateID(): number
    {
        let candidate = 100;
        while(this.getEducationCertificationById(candidate) != null)
        {
            candidate++;
        }
        return candidate;
    }

}
