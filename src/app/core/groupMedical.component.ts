import { Component, Inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { GroupMedical } from "../model/groupMedical.model";
import { GroupMedicalModel } from "../model/groupMedical.repository.model";
import { MODES, SharedState, SHARED_STATE } from "./sharedState.model";
import { Observable } from "rxjs";
import { Observer } from "rxjs";
import { Relationship } from "../model/relationship.model";
import { Gender } from "../model/gender.model";
import { Kid } from "../model/kid.model"; 
import { Router } from "@angular/router";
import { state } from '@angular/animations';
import { KidModel } from '../model/kid.repository.model';
import { timestamp } from 'rxjs/operators';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { PersonalDetails } from "../model/personaldetails.model";
import { PersonalDetailsModel } from "../model/personalDetails.repository.model";
import { ThrowStmt } from "@angular/compiler";
import { ThemePalette } from "@angular/material/core";
export interface Task {
    name: string;
    completed: boolean;
    color: ThemePalette;
    subtasks?: Task[];
  }

@Component({
    selector: "gmForm",
    templateUrl: "groupMedical.component.html",
    styleUrls: ["groupMedical.component.css"]
})

export class GroupMedicalComponent
{
    groupMedical: GroupMedical = new GroupMedical();
    relationShips: Relationship[] = new Array<Relationship>();
    gender: Gender[] = new Array<Gender>();
    kids: Kid[] = new Array<Kid>();
    personalEmployeeId: number =1;
    href: string = "";
    isSummaryPage: boolean = false;
    task: Task = {
        name: 'Indeterminate',
        completed: false,
        color: 'primary',
        subtasks: [
          {name: 'Primary', completed: false, color: 'primary'},
          {name: 'Accent', completed: false, color: 'accent'},
          {name: 'Warn', completed: false, color: 'warn'}
        ]
      };

    constructor(private model: GroupMedicalModel,private kidModel: KidModel,
            private personalDetailsModel: PersonalDetailsModel,
            @Inject(SHARED_STATE) public stateEvents: Observable<SharedState>,
            @Inject(SHARED_STATE) public observer: Observer<SharedState>,
            private router: Router)
    {
       
      
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
        
        if(!this.editing)
        {
           // this.gender.push(new Gender(-1, "Please select"));
            this.gender.push(new Gender(1, "Male"));
            this.gender.push(new Gender(2, "Female"));
            this.gender.push(new Gender(3,"Transgender"));

            this.relationShips.push(new Relationship(1, "Father"));
            this.relationShips.push(new Relationship(1, "Mother"));
            this.relationShips.push(new Relationship(1, "Father-in-Law"));
            this.relationShips.push(new Relationship(1, "Mother-in-Law"));

        }   
        if(sessionStorage.getItem("PersonalDetailsEmployeeId"))
        {
            this.editing = false;
            this.personalEmployeeId = Number(sessionStorage.getItem("PersonalDetailsEmployeeId"));
            this.personalDetailsModel.getPersonalDetailsById(this.personalEmployeeId).subscribe
            (data => {
                if(data)
                {
                    if(data.groupMedicalCoverGroupMedicalId != null)
                    {
                        this.groupMedical = this.model.getGroupMedicalById(data.groupMedicalCoverGroupMedicalId);
                        console.log(this.groupMedical.doYouHaveKids);
                        if(this.groupMedical.doYouHaveKids)
                        {
                            this.kidModel.getKidByGroupMedicalId(data.groupMedicalCoverGroupMedicalId).subscribe
                            (datakid => {
                                if(datakid)
                                {
                                    this.groupMedical.kids= datakid;
                                }
                            });
                        }
                        else
                        {
                            this.groupMedical.kids= new Array<Kid>();
                        }
                        // if(this.groupMedical.kids.length > 0)
                        // {
                        //     this.groupMedical.doYouHaveKids = true;
                        //     this.groupMedical.kids = this.groupMedical.kids;
                        //     var kidCount = 0;
                        //     for (var val in this.groupMedical.kids) {
                        //         this.groupMedical.kids[kidCount].kidName =  this.groupMedical.kids[val].kidName;
                        //         this.groupMedical.kids[kidCount].kidDateOfBirth =  this.groupMedical.kids[val].kidDateOfBirth;
                        //         this.groupMedical.kids[kidCount].kidgender =  this.groupMedical.kids[val].kidgender;
                        //         kidCount = kidCount + 1;
                        //       }
                        // }
                        this.editing = true;
                    }
                    else
                    {
                        this.groupMedical = new GroupMedical();
                    }
                }
            });
        }
        else
        {
            this.editing = false;
            this.personalEmployeeId =-1
            this.router.navigateByUrl("/form/otherDetails");
        }           
    }
  

    editing: boolean = false;

    submitForm(form: NgForm)
    {
        if(form.valid)
        {

            if(this.editing)
            {
                this.groupMedical.groupMedicalId=this.groupMedical.groupMedicalId;
            }
            else
            {
                this.groupMedical.groupMedicalId= null;
            }
            console.log("In");
            console.log(this.groupMedical);
            this.groupMedical.personalDetailEmployeeId = this.personalEmployeeId;
            this.groupMedical.dateOfJoining = new Date();
            this.groupMedical.married = (this.groupMedical.married) ? true : false;
            this.groupMedical.doYouHaveKids = (this.groupMedical.doYouHaveKids) ? true : false;

            if(!this.groupMedical.married)
            {
                this.groupMedical.dateOfMarriage =  new Date();
                this.groupMedical.spouseDateOfBirth=  new Date();
                this.groupMedical.spouseName="";
                this.groupMedical.spouseGender="";
            }
            if(!this.groupMedical.doYouHaveKids)
            {
                this.groupMedical.kids = this.kids;
            }
            console.log(this.groupMedical);
            this.model.saveGroupMedical(this.groupMedical);
            //sessionStorage.setItem("GroupMedicalEmployeeId",this.groupMedical.groupMedicalId.toString());
            this.router.navigateByUrl("/form/otherDetails");
        }
    }

    getToday(): string {
        return new Date().toISOString().split('T')[0]
     }

    resetForm()
    {
        this.groupMedical = new GroupMedical();
    }
    getPersonalDetailsGM()
    {
            this.router.navigateByUrl("/form/previousEmployers");
    }
}