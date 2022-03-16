import { Component, OnInit } from '@angular/core';
import { faFilter, faPencil, faPlus, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Car } from 'src/app/models/car';
import { MockCarService } from 'src/app/services/mock-car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  addIcon = faPlus;
  deleteIcon = faTrash;
  editIcon = faPencil;
  filterIcon = faFilter
  searchIcon = faSearch

  searchFilter : string = "";
  
  cars : Car[] = [];

  carSelected ?: Car;

  filterChosen = "default"

  constructor(
    private modalService : NgbModal,
    private mockCarService : MockCarService,
    private router : Router) { 
    
    }

  async ngOnInit() {
    await this.getCars()
  }

  open(content : any, car ?: Car){
    const modalRef = this.modalService.open(content);
    this.carSelected = car;
  }

  chooseFilter(filter : string){
    this.filterChosen = filter;
  }

  getCars(){
      this.cars = []
      let nullArray : [any,any,any,any,any,any,any,any,any,any] = [null,null,null,null,null,null,null,null,null,null];
      this.mockCarService.getAll().subscribe({
      next : (res)=>{
        res.forEach((resElem : Car)=>{
          let newCar = new Car(resElem,...nullArray)
          this.cars.push(newCar)
        }) 
      },
      error : (err)=>{
        console.log("Error !");
        console.log(err);
      }
    });
  }

  async deleteCar(id : any){
    this.mockCarService.deleteCar(id).subscribe({
      next : (res)=>{
        
      },
      error: (err)=>{
        console.log("Error !");
        console.log(err);       
      }
    })

    await this.getCars()
  }

  async onModalSave(bool : boolean){
    await this.getCars()
  }
  
}
