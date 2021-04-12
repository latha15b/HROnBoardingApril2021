import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ModelModule } from "../model/model.module";
import { FormPersonalDetailsComponent } from "./formPersonalDetails.component";
import { SharedState, SHARED_STATE } from "./sharedState.model";
import { Subject } from "rxjs";
import { HomepageComponent } from "./homepage.component";
import { EducationDetailsComponent } from "./educationDetails.component";
import { MessageModule } from '../messages/message.module';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import { EducationCertificationComponent } from './educationCertification.component';
import { PreviousEmployerComponent } from './previousEmployer.component';
import { GroupMedicalComponent } from './groupMedical.component';
import { OtherDetailsComponent } from './otherDetails.component';
import { OtherProfessionalDetailsComponent } from './otherProfessionalDetails.component';
import { UploadDocumentsComponent } from './uploadDocuments.component';
import { SummaryDetailsComponent } from './summaryDetails.component';
import { NumberOnlyDirective } from "../shared/directive/number-only-directive"


@NgModule({
    imports: [ BrowserModule,
               FormsModule, 
               ModelModule, 
               MessageModule, 
               RouterModule,
               MatInputModule,
               MatFormFieldModule,
               MatIconModule,
               MatDatepickerModule,
               MatNativeDateModule,
               MatToolbarModule,
               MatCheckboxModule,
               MatRadioModule,
               MatTableModule
               
            ],
    declarations: [FormPersonalDetailsComponent, HomepageComponent, EducationDetailsComponent,EducationCertificationComponent,PreviousEmployerComponent,GroupMedicalComponent,OtherDetailsComponent,OtherProfessionalDetailsComponent,UploadDocumentsComponent,SummaryDetailsComponent,NumberOnlyDirective],
    exports: [ModelModule, FormPersonalDetailsComponent, HomepageComponent, EducationDetailsComponent,EducationCertificationComponent,PreviousEmployerComponent,GroupMedicalComponent,OtherDetailsComponent,OtherProfessionalDetailsComponent,UploadDocumentsComponent,SummaryDetailsComponent,NumberOnlyDirective],
    providers: [{ provide: SHARED_STATE, useValue: new Subject<SharedState>() }]
})

export class CoreModule
{}