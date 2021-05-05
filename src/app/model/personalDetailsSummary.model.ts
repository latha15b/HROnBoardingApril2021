import { EducationQualificationSummary } from "./educationqualificationsummary.model";
import { EducationCertificationSummary } from "./educationcertificationsummary.model";
import { PreviousEmployerSummary } from "./previousemployersummary.model";
import { GroupMedicalSummary } from "./groupMedicalSummary.model";
import { OtherDetailsSummary } from "./otherDetailsSummary.model";
import { OtherProfessionalDetailsSummary } from "./otherProfessionalDetailsSummary.model";
import { UploadDocumentsSummary }  from "./UploadDocumentsSummary.model";

export class PersonalDetailsSummary
{
    constructor(
        public employeeId?: number,
        public title?: string,
        public firstName?: string,
        public lastName?: string,
        public dateOfBirth?: string,
        public cellNumber?: string,
        public currentAddress?: string,
        public city?: string,
        public pincode?: number,
        public state?: string,
        public gender?: string,
        public bloodGroup?: string,
        public emergencyContactNumber?: string,
        public personalEmailId?: string,
        public isDeclarationStatus?: boolean,
        public totalYearsOfExperience?: number,
        public permanentAddressCity?: string,
        public permanentAddress?: string,
        public permanentAddressPincode?: string,
        public permanentAddressState?: string,
        public educationQualificationsSummaries: EducationQualificationSummary[] = [],
        public educationCertificationsSummaries: EducationCertificationSummary[] = [],
        public previousEmployersSummaries: PreviousEmployerSummary[] = [],
        public groupMedicalCoverSummary: GroupMedicalSummary = new GroupMedicalSummary(),
        public otherDetailsSummary: OtherDetailsSummary = new OtherDetailsSummary(),
        public otherProfessionalDetailsSummary: OtherProfessionalDetailsSummary = new OtherProfessionalDetailsSummary(),
        public uploadDocumentsSummary: UploadDocumentsSummary[] = []
    ) {}
}