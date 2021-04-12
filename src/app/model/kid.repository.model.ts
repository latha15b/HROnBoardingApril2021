import { Injectable } from "@angular/core";
import { Observable, ObservableLike } from 'rxjs';
import { City } from './city.model';
import { Kid } from "./kid.model";
//import { StaticDataSource } from "./static.datasource";
import { KidRestDataSource } from "./kid.rest.datasource";
import { State } from './state.model';

@Injectable()
export class KidModel
{
    private kid: Kid[] = new Array<Kid>();
    private locator = (p: Kid, kidId: number) => p.kidId == kidId;
    private locatorGrp = (p: Kid, groupMedicalId: number) => p.groupMedicalCoverGroupMedicalId == groupMedicalId;

    constructor(private dataSource: KidRestDataSource) 
    {
        //this.Kid = new Array<Kid>();
        //this.dataSource.getData().forEach(p => this.Kid.push(p));
        this.dataSource.getData().subscribe(data => this.kid = data);
    }

    getKid(): Kid[]
    {
        return this.kid;
    }

    getKidById(kidId: number): Kid
    {
        return this.kid.find(p => this.locator(p,kidId));
    }
    getKidByGroupMedicalId(groupMedicalId: number): Observable<Kid[]>
    {
        return this.dataSource.getKidByGroupMedicalId(groupMedicalId);
    }
    saveKid(kid: Kid)
    {
        if(kid.kidId == 0 || kid.kidId == null)
        {
             this.dataSource.saveKid(kid).subscribe(p => this.kid.push(p));
        }
        else
        {
            this.dataSource.updateKid(kid).subscribe(p => {
                let index = this.kid.findIndex(pd => this.locator(pd, kid.kidId));
                this.kid.splice(index, 1, kid);
            });
        }
    }

    deleteKid(kidId: number)
    {
        let index = this.kid.findIndex(edu => this.locator(edu, kidId));
        if(index > -1)
        {
            this.kid.splice(index, 1);
        }
    }

    private generateID(): number
    {
        let candidate = 100;
        while(this.getKidById(candidate) != null)
        {
            candidate++;
        }
        return candidate;
    }

}
