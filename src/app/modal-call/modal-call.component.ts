import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-modal-call',
  templateUrl: './modal-call.component.html',
  styleUrls: ['./modal-call.component.css']
})
export class ModalCallComponent implements OnInit {

  constructor(private modalService : NgbModal) {
    
  }

  open(content : any){
    const modalRef = this.modalService.open(content)
  }

  ngOnInit(): void {
  }

}
