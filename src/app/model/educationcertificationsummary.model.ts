export class EducationCertificationSummary
{
    constructor(
        public nameOfCertifcation?:string,
        public year?: number,
        public certificateNumber?: string,
        public expiryDateOfCertificate?: string
    ) {}
}