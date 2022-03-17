import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { appRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CarsComponent } from './components/cars/cars.component';
import { CarsInfoComponent } from './components/cars-info/cars-info.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddCarModalComponent } from './components/modals/add-car-modal/add-car-modal.component';
import { OffersComponent } from './components/offers/offers.component';

import { SearchFilterPipe } from './pipes/search-filter.pipe';

import { MockCarService } from './services/mock-car.service';
import { AddOfferModalComponent } from './components/modals/add-offer-modal/add-offer-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarsComponent,
    CarsInfoComponent,
    NotfoundComponent,
    NavbarComponent,
    AddCarModalComponent,
    SearchFilterPipe,
    OffersComponent,
    AddOfferModalComponent,
    
  ],
  imports: [
    BrowserModule,
    NgbModule,
    appRoutingModule,
    FontAwesomeModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule  
  ],
  providers: [MockCarService],
  bootstrap: [AppComponent],
  entryComponents: [
    
  ] 
})
export class AppModule { }
