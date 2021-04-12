export class EducationCertification
{
    constructor(
        public educationCertificationId?:number,
        public nameOfCertifcation?:string,
        public year?: number,
        public certificateNumber?: string,
        public expiryDateOfCertificate?: Date,
        public personalDetailEmployeeId?:number
        ) {}
}