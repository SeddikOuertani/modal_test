import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, FormControlName } from '@angular/forms';
import { Car } from 'src/app/models/car';
import { MockCarService } from 'src/app/services/mock-car.service';
import { faCheck, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-car-modal',
  templateUrl: './add-car-modal.component.html',
  styleUrls: ['./add-car-modal.component.css']
})
export class AddCarModalComponent implements OnInit{

  //styling
  //style ngClasses
  saleStyleClasses !: any;
  rentStyleClasses !: any;
  avStyleClasses !: any;
  visibleStyleClasses !: any;

  //Icons
  checkedIcon = faCheck;
  visibleIcon = faEye;
  nonVisibleIcon = faEyeSlash;

  //domManipulation
  saleIconHidden !: boolean;
  rentIconHidden !: boolean;
  
  //Inputs
  @Input() modal : any;
  @Input() content !: ElementRef;
  @Input() car ?: any;

  //Outputs
  @Output() closeResult = '';
  @Output() closedBySave : EventEmitter<boolean> = new EventEmitter()


  //My formGroup & form inputs
  form = new FormGroup({
    brand : new FormControl(''),
    model : new FormControl(''),
    mileage : new FormControl(''),
    price : new FormControl(''),
    rentPrice : new FormControl(''),
  })

  //Inputs that are not included in the formGroup
  forSale !: boolean;
  forRent !: boolean;
  selectedUnit !: string;
  available !: boolean;
  visible !: boolean;

  //Rent price time unit
  unitList = [
    "Hour",
    "Day",
    "Week",
    "Month"
  ]

  constructor(
      private modalService: NgbModal,
      private mockCarService : MockCarService) {
      }

  ngOnInit(): void {
    this.initFormBooleans();
    this.car?this.initFormForUpdate(this.car):null;
    
    this.selectedUnit = "Choose Unit";

     
    this.saleStyleClasses =  {
      'rs-clicked' : this.forSale
    };

    this.rentStyleClasses = {
      'rs-clicked' : this.forRent
    };

    this.avStyleClasses = {
      'not-available' : !this.available
    }
    
    this.visibleStyleClasses = {
      'not-visible' : !this.visible,
    }

    this.saleIconHidden = this.forSale?false:true;
    this.rentIconHidden = this.forRent?false:true;

    console.log("available : ")
    console.log(this.available)
    
    console.log("visible : ")
    console.log(this.visible)

    console.log("forSale : ")
    console.log(this.forSale)
    
    console.log("forRent : ")
    console.log(this.forRent)
  }

  
  async initFormBooleans(){
    this.forSale = true;
    this.forRent = false;
    this.available = true;
    this.visible = true;

  }

  
  initFormForUpdate(car : Car){
    this.form.reset({
      brand : car?.getBrand(),
      model : car?.getModel(),
      mileage : car?.getMileage(),
      price : car?.getPrice(),
      rentPrice : car?.getRentPrice(),
    });

    this.forSale = car?.isForSale();
    this.forRent = car?.isForRent();
    this.available = car?.isAvailable();
    this.visible = car?.isVisible();

  }

  onSubmit(){
    let id;
    if(this.car){
      id = this.car.id
    }else{
      id = new Date().toString();
    }

    this.form.addControl("forSale", new FormControl(this.forSale));
    this.form.addControl("forRent", new FormControl(this.forRent));
    this.form.addControl("available", new FormControl(this.available));
    this.form.addControl("visible", new FormControl(this.visible));

    let carForm : [any, string, string, number, number, number, boolean, boolean, boolean, boolean] = 
      [
        id, 
        this.form.value['brand'],
        this.form.value['model'], 
        Number.parseFloat(this.form.value['mileage']),
        Number.parseFloat(this.form.value['price']),
        Number.parseFloat(this.form.value['rentPrice']),
        this.form.value['forSale'],
        this.form.value['forRent'],
        this.form.value['available'],
        this.form.value['visible']
      ]
    
    if(this.car){
      this.mockCarService.updateCar(new Car(null,...carForm)).subscribe({
        next : (res) =>{
          console.log(`Car ${res} has been updated successfully`);
          this.emitCloseSave();
        },
        error : (err)=>{
          console.log('Error !');
          console.log(err);
        }
      })
    }else{
      this.mockCarService.addCar(new Car(null,...carForm)).subscribe({
        next : (res)=>{
          this.emitCloseSave();
        },
        error : (err)=>{
          console.log("ERROR !");
          console.log(err);
        }
      });
    }
  }

  open(content : any) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  emitCloseSave(){
    
   this.closedBySave.emit(true)
    
  }

  updateUnit(unit : string){
    this.selectedUnit = unit;
  }

  toggleForSaleState(){
    this.forSale = !this.forSale;
    this.saleStyleClasses['rs-clicked']=this.forSale;
    this.saleIconHidden = !this.forSale;
  }

  toggleForRentState(){
    this.forRent = !this.forRent;
    this.rentStyleClasses['rs-clicked']=this.forRent;
    this.rentIconHidden = !this.forRent;
  }
  
  toggleAvailabilityState(){
    this.available = !this.available;
    this.avStyleClasses['not-available'] = !this.available;
  }

  toggleVisibilityState(){
    this.visible = !this.visible;
    this.visibleStyleClasses['not-visible'] = !this.visible;
  }

}
