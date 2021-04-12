import { Injectable } from "@angular/core";
import { Observable, ObservableLike } from 'rxjs';
import { City } from './city.model';
import { EducationQualification } from "./EducationQualification.model";
//import { StaticDataSource } from "./static.datasource";
import { EducationQualificationRestDataSource } from "./education-Qualification.rest.datasource";
import { State } from './state.model';

@Injectable()
export class EducationQualificationModel
{
    private educationQualification: EducationQualification[] = new Array<EducationQualification>();
    private locator = (p: EducationQualification, educationQualificationId: number) => p.educationQualificationId == educationQualificationId;

    constructor(private dataSource: EducationQualificationRestDataSource) 
    {
        //this.EducationQualification = new Array<EducationQualification>();
        //this.dataSource.getData().forEach(p => this.EducationQualification.push(p));
        this.dataSource.getData().subscribe(data => this.educationQualification = data);
        
    }

    getEducationQualification(): EducationQualification[]
    {
        return this.educationQualification;
    }

    getEducationQualificationByEmpId(educationQualificationId: number): Observable<EducationQualification[]>
    {
        return this.dataSource.getEducationQualificationbyEmpId(educationQualificationId);
    }
    getEducationQualificationById(educationQualificationId: number): EducationQualification
    {
        return this.educationQualification.find(p => this.locator(p,educationQualificationId));
    }
    saveEducationQualification(educationQualification: EducationQualification)
    {
        if(educationQualification.educationQualificationId == 0 || educationQualification.educationQualificationId == null)
        {
             this.dataSource.saveEducationQualification(educationQualification).subscribe(p => this.educationQualification.push(p));
        }
        else
        {
            this.dataSource.updateEducationQualification(educationQualification).subscribe(p => {
                let index = this.educationQualification.findIndex(pd => this.locator(pd, educationQualification.educationQualificationId));
                this.educationQualification.splice(index, 1, educationQualification);
            });
        }
    }

    deleteEducationQualification(educationQualificationId: number)
    {
        let index = this.educationQualification.findIndex(edu => this.locator(edu, educationQualificationId));
        if(index > -1)
        {
            this.educationQualification.splice(index, 1);
        }
    }

    private generateID(): number
    {
        let candidate = 100;
        while(this.getEducationQualificationById(candidate) != null)
        {
            candidate++;
        }
        return candidate;
    }

}
