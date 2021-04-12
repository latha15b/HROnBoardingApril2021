import { State } from "./state.model";

export class UploadDocuments
{
    constructor(
        public uploadDocumentId?: number,
        public fileContent?: any,
        public fileName?: string,
        public modifiedDate?: Date,
        public documentTypeName?: string,
        public documentTypeId?: number,
        public personalDetailEmployeeId?: number,
        ) {}
}
