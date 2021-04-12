import { Routes, RouterModule } from "@angular/router"; 
import { HomepageComponent } from "./core/homepage.component";
import { FormPersonalDetailsComponent } from "./core/formPersonalDetails.component";
import { EducationDetailsComponent } from "./core/educationDetails.component";
import { EducationCertificationComponent } from "./core/educationCertification.component";
import { PreviousEmployerComponent } from "./core/previousEmployer.component";
import { GroupMedicalComponent } from './core/groupMedical.component';
import { OtherDetailsComponent } from "./core/otherDetails.component";
import { OtherProfessionalDetailsComponent } from "./core/otherProfessionalDetails.component";
import { UploadDocumentsComponent } from "./core/uploadDocuments.component";
import { SummaryDetailsComponent } from './core/summaryDetails.component';


const routes: Routes = 
[ 
    { path: "form/createpersonaldetails", component: FormPersonalDetailsComponent }, 
    { path: "form/educationdetails", component: EducationDetailsComponent }, 
    { path: "form/educationcertifications", component: EducationCertificationComponent }, 
    { path: "form/previousEmployers", component: PreviousEmployerComponent }, 
    { path: "form/groupMedicalCovers", component: GroupMedicalComponent }, 
    { path: "form/otherDetails", component: OtherDetailsComponent }, 
    { path: "form/otherProfessionalDetails", component: OtherProfessionalDetailsComponent }, 
    { path: "form/uploadDocuments", component: UploadDocumentsComponent }, 
    { path: "form/summaryDetails", component: SummaryDetailsComponent }, 
    { path: "", component: HomepageComponent  }
] 
export const routing = RouterModule.forRoot(routes);