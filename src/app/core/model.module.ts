import { from } from "rxjs";
import { NgModule } from "@angular/core";
import { PersonalDetailsModel } from "../model/personalDetails.repository.model";
import { HttpClientModule } from "@angular/common/http";
import { PersonalDetailsRestDataSource, REST_URL } from "../model/personalDetails.rest.datasource";
import { OtpgeneratorRestDatasource,REST_URL_OTP } from "../model/otpgenerator.rest.datasource";
import { OtpGeneratorsModel } from "../model/otpgenerator.repository.model";
import { EducationQualificationRestDataSource,REST_URL_EQ } from "../model/education-Qualification.rest.datasource";
import { EducationQualificationModel } from "../model/educationQualification.repository.model";
import { EducationCertificationRestDataSource,REST_URL_EC } from "../model/educationcertification.rest.datasource";
import { EducationCertificationModel } from "../model/educationcertification.repository.model";
import { PreviousEmployerRestDataSource,REST_URL_PE } from "../model/previousEmployer.rest.datasource";
import { PreviousEmployerModel } from "../model/previousEmployer.repository.model";
import { GroupMedicalRestDataSource,REST_URL_GM } from "../model/groupMedical.rest.datasource";
import { GroupMedicalModel } from "../model/groupMedical.repository.model";
import { KidRestDataSource,REST_URL_Kid } from "../model/kid.rest.datasource";
import { KidModel } from "../model/kid.repository.model";

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

    {provide: REST_URL, useValue: `https://localhost:5001/api/personaldetails`},
    {provide: REST_URL_OTP, useValue: `https://localhost:5001/api/otpGenerators`},
    {provide: REST_URL_EQ, useValue: `https://localhost:5001/api/educationqualifications`},
    {provide: REST_URL_EC, useValue: `https://localhost:5001/api/educationcertifications`},
    {provide: REST_URL_PE, useValue: `https://localhost:5001/api/previousEmployers`},
    {provide: REST_URL_GM, useValue: `https://localhost:5001/api/groupMedicalCovers`},
    {provide: REST_URL_Kid, useValue: `https://localhost:5001/api/kids`}
    ],
    declarations: []
})

export class ModelModule {}
