import { Component, OnInit } from '@angular/core';
import { faFilter, faPlus, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  searchIcon = faSearch
  deleteIcon = faTrash
  filterIcon = faFilter
  addOfferIcon = faPlus

  offersList = []

  constructor(private modalService : NgbModal) { }

  ngOnInit(): void {
  }

  open(content : any){
    const modalRef = this.modalService.open(content);
  }

  async onModalSave(bool : boolean){
    
  }


}
