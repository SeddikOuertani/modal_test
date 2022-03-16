import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Car } from 'src/app/models/car';
import { MockCarService } from 'src/app/services/mock-car.service';

@Component({
  selector: 'app-cars-info',
  templateUrl: './cars-info.component.html',
  styleUrls: ['./cars-info.component.css']
})
export class CarsInfoComponent implements OnInit {

  removePicIcon = faTrash;
  addPicIcon = faPlus;

  //car id gotten from params
  carId : any;

  //car object (initialised with car id)
  car  !: Car; 
   
  //picture list (modified through adding new car pics or by downloading car pics)
  pics : any[] = [];
  
  //pic file loaded through input
  pic ?: any;
  
  //state of pic submission (initialised with false), changes state to true when submitting
  //only returns to "false" when the sumbittion observable returns res
  picSubmitted : boolean;
   
  //pic chosen only changes to true when user validates his choice of pic to upload
  picChosen : boolean;  

  constructor(
    private carService : MockCarService,
    private route : ActivatedRoute
  ) { 
    this.picSubmitted = false;
    this.picChosen = false;
  }

  ngOnInit(): void {

    this.gettingCarIdFromParams();
  
    this.getCar();
    
    this.getCarPics(this.carId);
    
  }

  gettingCarIdFromParams(){
    this.route.paramMap.subscribe({
      next : (res) => {
        this.carId = res.get('id');
      },
      error : (err) => {
        console.log("error getting carId from route params");
      }
    })
  }

  getCar(){
    this.carService.getCar(this.carId).subscribe({
      next : async (res) => {
        this.car = new Car(null,res._id,res.brand,res.model,res.mileage,res.price,res.rentPrice,res.forSale,res.forRent,res.available,res.visible);
      },
      error : (err) => {
        console.log("Error getting car!");
        console.log(err)
      }
    })
  }

  fileChosen(event : any){
    if(event.target.value){
      this.pic = <File>event.target.files[0];
      this.picChosen = true;
      this.uploadPic()
    }
  }  

  //uploading new car pic
  uploadPic(){
    
    let fd = new FormData()
    this.picSubmitted = true;
    if(this.pic){
      fd.append("carPic",this.pic,this.pic.name);
      this.carService.addCarPic(fd,this.car.getId()).subscribe({
        next : (res) => {
          if(res['success']){
            this.picSubmitted = false;
            this.picChosen = false;
          }
          
          //re-initializing pics array
          this.getCarPics(this.carId);

        },
        error : (err) => {
          console.log("Error uploading pic!");
          console.log(err);
        }
      })
    }
  }

  //open file input window
  addPic(addPicInput : HTMLInputElement){
    addPicInput.click()
  }

  //getting car pics
  getCarPics(carId : any){

    //initializing pics array
    this.pics=[]
 
    //downloading car pics 
    this.carService.getCarPics(carId).subscribe({
      next : async (res : any[]) => {
        console.log("Pictures downloaded successfully!");
        console.log(res)

        //loading pics into pics array
        await res.forEach((fileObj : any) =>{
          this.pics.push({
            encodedUrl : this.base64ToPic(fileObj),
            id : fileObj._id
          })
        })
        
      },
      error : (err) => {
        console.log("Error getting pics !")
        console.log(err)
      }
    })
  }


  //converting pic buffer data into base64 string
  bufferToBase64(arr : any) {
    
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(
       arr.reduce((data : any, byte : any) => data + String.fromCharCode(byte), '')
    );
  }

  //converting base64 strings of the pics buffer data into pics data
  base64ToPic(fileObj: any){
    return `data:${fileObj.file.mimetype};base64,${this.bufferToBase64(fileObj.file.buffer.data)}`;
  }

  deleteCarPic(picId : any){
    this.carService.deleteCarPic(picId).subscribe({
      next : (res) => {
        console.log("Picture deleted Successfully !");
         
        //re-initializing pics array
        this.getCarPics(this.carId)

      },
      error : (err) => {
        console.log("Error deleting picture "+picId);
      }
    })
  }

}
