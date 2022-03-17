import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-offer-modal',
  templateUrl: './add-offer-modal.component.html',
  styleUrls: ['./add-offer-modal.component.css']
})
export class AddOfferModalComponent implements OnInit {

  //Inputs
  @Input() modal : any;
  @Input() content !: ElementRef;
  @Input() offer ?: any;

  //Outputs
  @Output() closeResult = '';
  @Output() closedBySave : EventEmitter<boolean> = new EventEmitter();

    //My formGroup & form inputs
    form = new FormGroup({
      title : new FormControl(''),
      type : new FormControl(''),
      description : new FormControl(''),
      startDate : new FormControl(''),
      endDate : new FormControl(''),
      activated : new FormControl('')
    })

  constructor(private modalService : NgbModal) { }

  ngOnInit(): void {
  }

  onSubmit(){
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


}
