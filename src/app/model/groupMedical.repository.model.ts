import { Injectable } from "@angular/core";
import { Observable, ObservableLike } from 'rxjs';
import { City } from './city.model';
import { GroupMedical } from "./groupMedical.model";
//import { StaticDataSource } from "./static.datasource";
import { GroupMedicalRestDataSource } from "./groupMedical.rest.datasource";
import { State } from './state.model';

@Injectable()
export class GroupMedicalModel
{
    private groupMedical: GroupMedical[] = new Array<GroupMedical>();
    private locator = (p: GroupMedical, groupMedicalId: number) => p.groupMedicalId == groupMedicalId;

    constructor(private dataSource: GroupMedicalRestDataSource) 
    {
        //this.GroupMedical = new Array<GroupMedical>();
        //this.dataSource.getData().forEach(p => this.GroupMedical.push(p));
        this.dataSource.getData().subscribe(data => this.groupMedical = data);
        
    }

    getGroupMedical(): GroupMedical[]
    {
        return this.groupMedical;
    }

    getGroupMedicalById(groupMedicalId: number): GroupMedical
    {
        return this.groupMedical.find(p => this.locator(p,groupMedicalId));
    }
    
    saveGroupMedical(groupMedical: GroupMedical)
    {
        if(groupMedical.groupMedicalId == 0 || groupMedical.groupMedicalId == null)
        {
             this.dataSource.saveGroupMedical(groupMedical).subscribe(p => this.groupMedical.push(p));
        }
        else
        {
            this.dataSource.updateGroupMedical(groupMedical).subscribe(p => {
                let index = this.groupMedical.findIndex(pd => this.locator(pd, groupMedical.groupMedicalId));
                this.groupMedical.splice(index, 1, groupMedical);
            });
        }
    }


    deleteGroupMedical(groupMedicalId: number)
    {
        let index = this.groupMedical.findIndex(edu => this.locator(edu, groupMedicalId));
        if(index > -1)
        {
            this.groupMedical.splice(index, 1);
        }
    }

    private generateID(): number
    {
        let candidate = 100;
        while(this.getGroupMedicalById(candidate) != null)
        {
            candidate++;
        }
        return candidate;
    }

}
