import { Component, Inject, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MODES, SharedState, SHARED_STATE } from "./sharedState.model";
import { Observable } from "rxjs";
import { Observer } from "rxjs";
import { EducationQualification } from '../model/EducationQualification.model';
import { EducationQualificationModel } from "../model/educationQualification.repository.model";
import { Router } from "@angular/router";
import { formatCurrency } from '@angular/common';
import { PersonalDetailsModel } from '../model/personalDetails.repository.model';

@Component({
    selector: "edForm",
    templateUrl: "educationDetails.component.html",
    styleUrls: ["educationDetails.component.css"]
})

export class EducationDetailsComponent
{
    controlDetails: EducationQualification = new EducationQualification();
    education: EducationQualification = new EducationQualification();
    //today = new Date();
    count:number = 1;
    personalEmployeeId: number = -1;
    editing: boolean = false;
    @ViewChild('form') form;
    href: string = "";
    isSummaryPage: boolean = false;

    //controlDetails: EducationQualification = new  = {id:0,highestQualification:"",yearOfPassing:"",nameOfUniversity:"",specialization:"",isHigh:false};
    controls = { controlDetails: [] };
    constructor(private model: EducationQualificationModel,private router: Router,
        @Inject(SHARED_STATE) public stateEvents: Observable<SharedState>,
        @Inject(SHARED_STATE) public observer: Observer<SharedState>)
    {
        stateEvents.subscribe(p => {
            console.log("ses" + p);
        })
        
    }

    ngOnInit(): void 
    {
        this.href = this.router.url;
        console.log("URL " + this.href);
        if(this.href == "/form/summaryDetails")
        {
            this.isSummaryPage = true;
        }
        else
        {
            this.isSummaryPage = false;
        }
        this.controls.controlDetails = [this.controlDetails];
        if(!this.editing)
        {
            console.log("In Editing");
                       
        }     
        if(sessionStorage.getItem("PersonalDetailsEmployeeId"))
        {
            this.editing = false;
            this.personalEmployeeId = Number(sessionStorage.getItem("PersonalDetailsEmployeeId"));
            //we get the arry id for Education details 
            const res = this.model.getEducationQualificationByEmpId(this.personalEmployeeId).subscribe
            (data => {
                if(data.length >= 1)
                {
                    this.controls.controlDetails= data;
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


    addControls(form: NgForm)
    {
      if(this.controls.controlDetails.length < 3 && form.valid)
      {
        const newControl = new EducationQualification;
        newControl.educationQualificationId=this.count++;
        this.controls.controlDetails.push(JSON.parse(JSON.stringify(newControl)));
      }    
    }
    deleteControls(control)
    {
        if(this.controls.controlDetails.length > 1)
        {
            this.controls.controlDetails = this.controls.controlDetails.filter(x => x.educationQualificationId != control.educationQualificationId)
            this.count = this.count-1;
        }
    }

    // isHighestQualification(isHigh: boolean)
    // {
    //     if(!isHigh && this.controls.controlDetails.filter(x => x.isHighestQualification).length >= 1)
    //     {
    //         return true;
    //     }
    //     else
    //     return false;
    // }

    submitForm(form: NgForm)
    {
        if(form.valid)
        {
            if(this.editing)
            {
                for (var val in this.controls.controlDetails) 
                {
                    this.education = new EducationQualification();
                    this.education.educationQualificationId = this.controls.controlDetails[val].educationQualificationId;
                    this.education.personalDetailEmployeeId= this.personalEmployeeId;
                    this.education.yearOfPassing=this.controls.controlDetails[val].yearOfPassing;
                    this.education.qualification=this.controls.controlDetails[val].qualification;
                    this.education.specialization=this.controls.controlDetails[val].specialization;
                    this.education.nameOfUniversity=this.controls.controlDetails[val].nameOfUniversity;
                    this.education.isHighestQualification=false;
                    if(val == "0")
                    {
                        this.education.isHighestQualification=true;
                    }
                    console.log(this.education);
                    this.model.saveEducationQualification(this.education);
                }
                this.router.navigateByUrl("/form/educationdetails");


            }
            else
            {
                console.log("In");
                for (var val in this.controls.controlDetails) 
                {
                    this.education = new EducationQualification();
                    this.education.personalDetailEmployeeId= this.personalEmployeeId;;
                    this.education.yearOfPassing=this.controls.controlDetails[val].yearOfPassing;
                    this.education.qualification=this.controls.controlDetails[val].qualification;
                    this.education.specialization=this.controls.controlDetails[val].specialization;
                    this.education.nameOfUniversity=this.controls.controlDetails[val].nameOfUniversity;
                    this.education.isHighestQualification=false;
                    if(val == "0")
                    {
                        this.education.isHighestQualification=true;
                    }
                    console.log(this.education);
                    this.model.saveEducationQualification(this.education);
                }
                this.router.navigateByUrl("/form/educationdetails");
            }
        }
    }
    submitFormED()
    {
        this.form.onSubmit(undefined);
        //this.form.nativeElement.submit();
    }
  
    getPersonalDetails()
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
        this.controlDetails = new EducationQualification();
    }
}