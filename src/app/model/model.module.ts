import { from } from "rxjs";
import { NgModule } from "@angular/core";
import { StaticDataSource } from "./static.datasource";
import { PersonalDetailsModel } from "./personalDetails.repository.model";
import { HttpClientModule } from "@angular/common/http";
import { PersonalDetailsRestDataSource, REST_URL } from "./personalDetails.rest.datasource";
import { OtpgeneratorRestDatasource,REST_URL_OTP } from "./otpgenerator.rest.datasource";
import { OtpGeneratorsModel } from "./otpgenerator.repository.model";
import { EducationQualificationRestDataSource,REST_URL_EQ } from "./education-Qualification.rest.datasource";
import { EducationQualificationModel } from "./educationQualification.repository.model";
import { EducationCertificationRestDataSource,REST_URL_EC } from "./educationcertification.rest.datasource";
import { EducationCertificationModel } from "./educationcertification.repository.model";
import { PreviousEmployerRestDataSource,REST_URL_PE } from "./previousEmployer.rest.datasource";
import { PreviousEmployerModel } from "./previousEmployer.repository.model";
import { GroupMedicalRestDataSource,REST_URL_GM } from "./groupMedical.rest.datasource";
import { GroupMedicalModel } from "./groupMedical.repository.model";
import { KidRestDataSource,REST_URL_Kid } from "./kid.rest.datasource";
import { KidModel } from "./kid.repository.model";
import { OtherDetailsRestDataSource,REST_URL_OD } from "./otherDetails.rest.datasource";
import { OtherDetailsModel } from "./otherDetails.repository.model";
import { OtherProfessionalDetailsRestDataSource,REST_URL_OPD } from "./otherProfessionalDetails.rest.datasource";
import { OtherProfessionalDetailsModel } from "./otherProfessionalDetails.repository.model";
import { UploadDocumentsRestDataSource,REST_URL_UD } from "./uploadDocuments.rest.datasource";
import { UploadDocumentsModel } from "./uploadDocuments.repository.model";
//import { TestComponent } from './test/test.component';

@NgModule({
    imports: [HttpClientModule],
    providers: [PersonalDetailsModel, PersonalDetailsRestDataSource,
        OtpgeneratorRestDatasource,OtpGeneratorsModel,
        EducationQualificationRestDataSource,EducationQualificationModel,
        EducationCertificationRestDataSource,EducationCertificationModel,
        PreviousEmployerRestDataSource,PreviousEmployerModel,
        GroupMedicalRestDataSource,GroupMedicalModel,
        KidRestDataSource,KidModel,
        OtherDetailsRestDataSource,OtherDetailsModel,
        OtherProfessionalDetailsRestDataSource,OtherProfessionalDetailsModel,
        UploadDocumentsRestDataSource,UploadDocumentsModel,

    {provide: REST_URL, useValue: `https://localhost:5001/api/personaldetails`},
    {provide: REST_URL_OTP, useValue: `https://localhost:5001/api/otpGenerators`},
    {provide: REST_URL_EQ, useValue: `https://localhost:5001/api/educationqualifications`},
    {provide: REST_URL_EC, useValue: `https://localhost:5001/api/educationcertifications`},
    {provide: REST_URL_PE, useValue: `https://localhost:5001/api/previousEmployers`},
    {provide: REST_URL_GM, useValue: `https://localhost:5001/api/groupMedicalCovers`},
    {provide: REST_URL_Kid, useValue: `https://localhost:5001/api/kids`},
    {provide: REST_URL_OD, useValue: `https://localhost:5001/api/otherDetails`},
    {provide: REST_URL_OPD, useValue: `https://localhost:5001/api/otherProfessionalDetails`},
    {provide: REST_URL_UD, useValue: `https://localhost:5001/api/uploadDocuments`}
    ],
    declarations: []
})

export class ModelModule {}
