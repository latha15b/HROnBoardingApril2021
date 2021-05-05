export class EducationQualificationSummary
{
    constructor(
        public qualification?:string,
        public yearOfPassing?: number,
        public nameOfUniversity?: string,
        public specialization?: string,
        public isHighestQualification?: boolean
        ) {}
}