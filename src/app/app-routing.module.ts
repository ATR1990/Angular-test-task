import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {CarsComponent} from "./views/cars/cars.component";
import {CarCreateComponent} from "./views/car-create/car-create.component";
import {CarEditComponent} from "./views/car-edit/car-edit.component";
import {CarDetailedComponent} from "./views/car-detailed/car-detailed.component";

const routes: Routes = [
  {path: '', component: CarsComponent},
  {path: 'edit/:id', component: CarEditComponent},
  {path: 'create', component: CarCreateComponent},
  {path: 'detailed-view/:id', component: CarDetailedComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
