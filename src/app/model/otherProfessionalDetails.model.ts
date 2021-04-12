import { State } from "./state.model";

export class OtherProfessionalDetails
{
    constructor(
        public otherProfessionalDetailsId?: number,
        public primarySkills?: string,
        public primarySkillsLevel?: string,
        public secondarySkills?: string,
        public secondarySkillLevel?: string,
        public verbalCommunicationLevel?: number,
        public writtenCommunicationLevel?: number,
        public presentationSkillsLevel?: number,
        public customerInterfactingLevel?: number,
        public personalDetailEmployeeId?:number
        ) {}
}
