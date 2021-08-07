import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevicesComponent } from './devices/devices.component';
import { GatewaysComponent } from './gateways/gateways.component';

const routes: Routes = [
  {path: 'Gateways', component: GatewaysComponent},
  {path: 'Devices',   component:DevicesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
