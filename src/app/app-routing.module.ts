import { NgModule } from '@angular/core'
import { RouterModule, Routes} from '@angular/router'
import { CarsInfoComponent } from './components/cars-info/cars-info.component'

import { CarsComponent } from './components/cars/cars.component'
import { HomeComponent } from './components/home/home.component'
import { NotfoundComponent } from './components/notfound/notfound.component'


const routes : Routes = [
    {path : '', redirectTo: '/home', pathMatch:'full'},
    {path : 'home', component : HomeComponent},
    {path : 'cars', component : CarsComponent},
    {path : 'cars/:id', component : CarsInfoComponent},
    {path : '**', component : NotfoundComponent}
]

@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})
export class appRoutingModule {}
