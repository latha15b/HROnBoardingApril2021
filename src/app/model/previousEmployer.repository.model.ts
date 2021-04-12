import { Injectable } from "@angular/core";
import { Observable, ObservableLike } from 'rxjs';
import { City } from './city.model';
import { PreviousEmployer } from "./previousemployer.model";
//import { StaticDataSource } from "./static.datasource";
import { PreviousEmployerRestDataSource } from "./previousEmployer.rest.datasource";
import { State } from './state.model';

@Injectable()
export class PreviousEmployerModel
{
    private previousEmployer: PreviousEmployer[] = new Array<PreviousEmployer>();
    private locator = (p: PreviousEmployer, previousEmployerId: number) => p.previousEmployerId == previousEmployerId;

    constructor(private dataSource: PreviousEmployerRestDataSource) 
    {
        //this.PreviousEmployer = new Array<PreviousEmployer>();
        //this.dataSource.getData().forEach(p => this.PreviousEmployer.push(p));
        this.dataSource.getData().subscribe(data => this.previousEmployer = data);
        
    }

    getPreviousEmployer(): PreviousEmployer[]
    {
        return this.previousEmployer;
    }

    getPreviousEmployerById(previousEmployerId: number): PreviousEmployer
    {
        return this.previousEmployer.find(p => this.locator(p,previousEmployerId));
    }
    savePreviousEmployer(previousEmployer: PreviousEmployer)
    {
        if(previousEmployer.previousEmployerId == 0 || previousEmployer.previousEmployerId == null)
        {
             this.dataSource.savePreviousEmployer(previousEmployer).subscribe(p => this.previousEmployer.push(p));
        }
        else
        {
            this.dataSource.updatePreviousEmployer(previousEmployer).subscribe(p => {
                let index = this.previousEmployer.findIndex(pd => this.locator(pd, previousEmployer.previousEmployerId));
                this.previousEmployer.splice(index, 1, previousEmployer);
            });
        }
    }
    getPreviousEmployerByEmployeeId(previousEmployerId: number): Observable<PreviousEmployer[]>
    {
        return this.dataSource.getPreviousEmployerByEmployeeId(previousEmployerId);
    }
    deletePreviousEmployer(previousEmployerId: number)
    {
        let index = this.previousEmployer.findIndex(edu => this.locator(edu, previousEmployerId));
        if(index > -1)
        {
            this.previousEmployer.splice(index, 1);
        }
    }

    private generateID(): number
    {
        let candidate = 100;
        while(this.getPreviousEmployerById(candidate) != null)
        {
            candidate++;
        }
        return candidate;
    }

}
