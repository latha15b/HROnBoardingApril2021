export class EducationQualification
{
    constructor(
        public educationQualificationId?:number,
        public qualification?:string,
        public yearOfPassing?: number,
        public nameOfUniversity?: string,
        public specialization?: string,
        public isHighestQualification?: boolean,
        public personalDetailEmployeeId?:number
        ) {}
}