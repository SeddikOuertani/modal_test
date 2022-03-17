import { Timestamp } from "rxjs";

export class Offer {
    
    private id : any;
    private title : string;
    private type : string;
    private description : string;
    private startDate : Date | null;
    private endDate : Date | null;
    private activated : boolean;

    constructor(title : string, type : string, description : string, activated : boolean, startDate ?: Date, endDate ?: Date){
        this.title = title;
        this.type = type;
        this.description = description;
        this.startDate = startDate?startDate:null;
        this.endDate = endDate?endDate:null;
        this.activated = activated;
    }

    public getId() : any{
        return this.id;
    }

    public getTitle() : string{
        return this.title;
    }

    public setTitle(title : string){
        this.title = title;
    }

    public getType() : string{
        return this.type;
    }

    public setType(type : string){
        this.title = type;
    }

    public getDescription() : string{
        return this.description;
    }

    public setDescription(description : string){
        this.description = description;
    }

    public getStartDate() : Date | null{
        return this.startDate;
    }

    public setSartDate(date : Date){
        this.startDate = date
    }

    public getEndDate() : Date | null{
        return this.endDate;
    }

    public setEndDate(date : Date){
        this.endDate = date
    }

    public isActivated() : boolean{
        return this.activated;
    }

    public setActivated(activated : boolean){
        this.activated = activated
    }

    
    
    
    
    

}
