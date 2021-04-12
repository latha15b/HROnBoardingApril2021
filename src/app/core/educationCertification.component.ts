import { Component, EventEmitter, Inject, Input, Output, ViewChild } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { EducationCertification } from '../model/educationcertification.model';
import { EducationCertificationModel } from '../model/educationcertification.repository.model';
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
    count:number = 1;
    personalEmployeeId: number = -1;
    editing: boolean = false;
    @Output() public submitEducationDetails = new EventEmitter();
    @Input('isParentValid') isParentValid = false; 
    href: string = "";
    isSummaryPage: boolean = false;
    controlsEC = { controlDetailsEC: [] };
    constructor(private model: EducationCertificationModel,private router: Router,
        @Inject(SHARED_STATE) public stateEvents: Observable<SharedState>,
        @Inject(SHARED_STATE) public observer: Observer<SharedState>)
    {
        console.log(stateEvents);
        
    }

    ngOnInit(): void 
    {
        this.href = this.router.url;
        console.log("URL " + this.href);
       
        this.controlsEC.controlDetailsEC = [this.controlDetailsEC];
        if(!this.editing)
        {
            console.log("In Editing");
                       
        }     
        if(sessionStorage.getItem("PersonalDetailsEmployeeId"))
        {
            this.editing = false;
            this.personalEmployeeId = Number(sessionStorage.getItem("PersonalDetailsEmployeeId"));
            this.model.getEducationCertificationByEmployeeId(this.personalEmployeeId).subscribe
                (dataEC => {
                    if(dataEC.length >= 1)
                    {
                        this.controlsEC.controlDetailsEC = dataEC;
                        this.editing = true;
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
        newControl.educationCertificationId=this.count++;
        this.controlsEC.controlDetailsEC.push(JSON.parse(JSON.stringify(newControl)));
      }    
    }
    deleteControlsEC(controlEC)
    {
        if(this.controlsEC.controlDetailsEC.length > 1)
        {
            this.controlsEC.controlDetailsEC = this.controlsEC.controlDetailsEC.filter(x => x.educationCertificationId != controlEC.educationCertificationId)
            this.count = this.count-1;
        }
    }
   

    submitForm(form: NgForm)
    {
        this.submitEducationDetails.emit();
        
        if(form.valid && this.isParentValid)
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
            this.router.navigateByUrl("/form/previousEmployers");
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