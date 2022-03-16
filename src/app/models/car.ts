export class Car {

    private id : any;
    private brand : string; 
    private model : string;
    private mileage : number;
    private price : number;
    private rentPrice : number;
    private forSale : boolean;
    private forRent : boolean;
    private available : boolean;
    private visible : boolean;
    
    constructor(
        car : any, 
        id :any, 
        brand :string, 
        model : string, 
        mileage :number, 
        price : number,
        rentPrice : number,
        forSale : boolean,
        forRent : boolean,
        available : boolean,
        visible : boolean )
        {
            if(car == null){
                this.id = id;
                this.brand = brand;
                this.model = model;
                this.mileage = mileage;
                this.price = price;
                this.rentPrice = rentPrice;
                this.forSale = forSale;
                this.forRent = forRent;
                this.available = available;
                this.visible = visible;
            }else{
                this.id = car._id;
                this.brand = car.brand;
                this.model = car.model;
                this.mileage = car.mileage;
                this.price = car.price;
                this.rentPrice = car.rentPrice;
                this.forSale = car.forSale;
                this.forRent = car.forRent;
                this.available = car.available;
                this.visible = car.visible;
            }
        }

    public getId(){
        return this.id;
    }

    public setModel(model : string){
        this.model = model;
    }

    public getModel() : string{
        return this.model;
    }

    public setBrand(brand : string){
        this.brand = brand;
    }

    public getBrand() : string{
        return this.brand;
    }

    public setMileage(mileage : number){
        this.mileage = mileage;
    }

    public getMileage() : number{
        return this.mileage;
    }
    
    public setPrice(price : number){
        this.price = price;
    }

    public getPrice() : number{
        return this.price;
    }

    public setRentPrice(price : number){
        this.rentPrice = price;
    }

    public getRentPrice() : number{
        return this.rentPrice;
    }

    public setForRent(forRent : boolean){
        this.forRent = forRent;
    }

    public isForRent() : boolean{
        return this.forRent;
    }
    
    public setForSale(forSale: boolean){
        this.forSale = forSale;
    }

    public isForSale() : boolean{
        return this.forSale;
    }

    public setAvailable(available : boolean){
        this.available = available;
    }

    public isAvailable() : boolean{
        return this.available;
    }

    public setVisible(visible : boolean){
        this.visible = visible;
    }

    public isVisible() : boolean {
        return this.visible
    }
    
}
