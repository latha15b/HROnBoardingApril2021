import { Kid } from "./kid.model";

export class GroupMedical
{
    constructor(
        public groupMedicalId?: number,
        public dateOfJoining?: Date,
        public parentOrInLawsName1?: string,
        public parentOrInLawsName2?: string,
        public parentOrInLawsName1Relationship?: string,
        public parentOrInLawsName2Relationship?: string,
        public married?: boolean,
        public dateOfMarriage?: Date,
        public spouseName?: string,
        public spouseDateOfBirth?: Date,
        public spouseGender?: string,
        public doYouHaveKids?: boolean,
        public kids: Kid[] = [new Kid(),new Kid()],
        public personalDetailEmployeeId?: number,
        ) {}
}