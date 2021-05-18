import { Component, EventEmitter, Inject, Input, Output, ViewChild } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { timestamp } from "rxjs/operators";
import { EducationCertification } from '../model/educationcertification.model';
import { EducationCertificationModel } from '../model/educationcertification.repository.model';
import { EducationQualificationModel } from "../model/educationQualification.repository.model";
import { EducationDetailsComponent } from "./educationDetails.component";
import { SharedState, SHARED_STATE } from './sharedState.model';

@Component({
    selector: "edCerForm",
    templateUrl: "educationCertification.component.html",
    styleUrls: ["educationCertification.component.css"]
})

export class EducationCertificationComponent
{
    controlDetailsEC: EducationCertification = new EducationCertification();
    educationCertification: EducationCertification = new EducationCertification();
    //today = new Date();
    countEC:number = 1;
    personalEmployeeId: number = -1;
    editing: boolean = false;
    AddControlnewEC: boolean = false;
    @Output() public submitEducationDetails = new EventEmitter();
    @Input('isParentValid') isParentValid = false; 
    href: string = "";
    isSummaryPage: boolean = false;
    controlsEC = { controlDetailsEC: [] };
    constructor(private model: EducationCertificationModel,private router: Router,
        private modelEdu: EducationQualificationModel,
        @Inject(SHARED_STATE) public stateEvents: Observable<SharedState>,
        @Inject(SHARED_STATE) public observer: Observer<SharedState>)
    {
        console.log(stateEvents);
        
    }

    ngOnInit(): void 
    {
        this.href = this.router.url;
        console.log("URL " + this.href);
        //this.editing = true;
       
        this.controlsEC.controlDetailsEC = [this.controlDetailsEC];
        if(!this.editing)
        {
            console.log("In Editing");
                       
        }     
        if(sessionStorage.getItem("PersonalDetailsEmployeeId"))
        {
            this.personalEmployeeId = Number(sessionStorage.getItem("PersonalDetailsEmployeeId"));
            this.modelEdu.getEducationQualificationByEmpId(this.personalEmployeeId).subscribe
                (data => {
                    if(data.length >= 1)
                    {
                        this.editing = true;
                    }
                });
            this.model.getEducationCertificationByEmployeeId(this.personalEmployeeId).subscribe
                (dataEC => {
                    if(dataEC.length >= 1)
                    {
                        this.controlsEC.controlDetailsEC = dataEC;
                        this.editing = true;
                        this.countEC = dataEC.length;
                    }
                });
        }
        else
        {
            this.editing = false;
            this.personalEmployeeId =-1
            this.router.navigateByUrl("/form/createpersonaldetails");
        }     
    }


    addControlsEC(form: NgForm)
    {
      if(this.controlsEC.controlDetailsEC.length < 3 && form.valid)
      {
        const newControl = new EducationCertification;
        newControl.educationCertificationId = this.countEC++;
        this.controlsEC.controlDetailsEC.push(JSON.parse(JSON.stringify(newControl)));
        this.AddControlnewEC = true;
      }    
    }
    deleteControlsEC(controlEC)
    {
        this.AddControlnewEC = false;
        if(this.controlsEC.controlDetailsEC.length > 1)
        {
            this.controlsEC.controlDetailsEC = this.controlsEC.controlDetailsEC.filter(x => x.educationCertificationId != controlEC.educationCertificationId)
            this.countEC = this.countEC-1;
        }
    }
   

    submitForm(form: NgForm)
    {
        this.submitEducationDetails.emit();
       
        if(form.valid && this.isParentValid && !this.AddControlnewEC) 
        {
            console.log("In");
         
            for (var val in this.controlsEC.controlDetailsEC) {
                this.educationCertification = new EducationCertification();
                if(this.editing)
                {
                    this.educationCertification.educationCertificationId=this.controlsEC.controlDetailsEC[val].educationCertificationId;
                }
                else
                {
                    this.educationCertification.educationCertificationId= null;
                }
                this.educationCertification.personalDetailEmployeeId=  this.personalEmployeeId;
                this.educationCertification.year=Number(this.controlsEC.controlDetailsEC[val].year);
                this.educationCertification.certificateNumber=this.controlsEC.controlDetailsEC[val].certificateNumber;
                this.educationCertification.nameOfCertifcation=this.controlsEC.controlDetailsEC[val].nameOfCertifcation;
                this.educationCertification.expiryDateOfCertificate=this.controlsEC.controlDetailsEC[val].expiryDateOfCertificate;
                console.log(this.educationCertification);
                this.model.saveEducationCertification(this.educationCertification);
              }
            this.editing = true;  
            this.router.navigateByUrl("/form/previousEmployers");
        }
        else
        {
            this.editing = true;
            this.AddControlnewEC = false;
        }
    }
   
    getPersonalDetailsEC()
    {
            this.router.navigateByUrl("/form/createpersonaldetails");
    }
    getYear(date: number)
    {
        return Number(date.toString().split(' ')[3]);
    }

    getToday(): string {
        return new Date().toISOString().split('T')[0]
     }
     openDatePicker(dp) {
        dp.open();
      }
      closeDatePicker(eventData: any, dp?:any) {
        // get month and year from eventData and close datepicker, thus not allowing user to select date
        dp.close();    
      }
    resetForm()
    {
        this.controlDetailsEC = new EducationCertification();
    }
}