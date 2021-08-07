import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild,ViewEncapsulation  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { GatewayServiceService } from '../gateway-service.service';
import { GatewayMap, GatewayMapper as Gateway } from '../Gateways';
import { DeviceMap as Device } from '../Devices';
import { NgbModal, NgbModalConfig,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gateways',
  templateUrl: './gateways.component.html',
  styleUrls: ['./gateways.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class GatewaysComponent implements OnInit {
  //isShowDevice:boolean=false;
  GatewaysList :any;
  GatewaysList1:Gateway[];
  ll:Gateway[];
  gatewayss:any=[];
  gatewayForm: any;
  massage = "";
  gatewayId :number;
  Users:[];
  products:any=[];
  li:any;
  lis:GatewayMap[];
  g:Gateway;
  gatewayDevices:any;
  gatewayDevicesList:Device[];
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private formbulider: FormBuilder, 
    private httpClient: HttpClient, private gatewayService: GatewayServiceService,
    private modalService: NgbModal,config: NgbModalConfig) 
 
     {     
    }

  ngOnInit(): void {
    this.gatewayForm = this.formbulider.group({
      Name: ['', [Validators.required]],
      SerialNumer: ['', [Validators.required]],
      IP4Address: ['', [Validators.required]]
  });
  this.getGatewayList();
}
getGatewayList(){
  this.gatewayService.getGatewayList().subscribe(Response => {
    this.li=Response;
    this.lis=this.li;
  });
}
ngOnDestroy() {
  this.destroy$.next(true);
  // Unsubscribe from the subject
  this.destroy$.unsubscribe();
}
/*
GetGatewayDevicesById(id:number){
  this.httpClient.get('https://localhost:44320/api/Gateways/GetDevicesByGatewayId?id='+id)
  .subscribe(Response => {
    this.gatewayDevices=Response;
    this.gatewayDevicesList=this.gatewayDevices;
  });
}
*/

PostGateway(product: GatewayMap) {
  debugger;
  const gateway_Master = this.gatewayForm.value;
  this.gatewayService.postGatewayData(gateway_Master).subscribe(
    () => {
      this.massage = 'Data Saved Successfully';
      this.getGatewayList();
    }
  );
}
GatewayDetailsToEdit(id:number) {
  debugger;
 const oneData=  this.lis.find(t=>t.id==id) as GatewayMap;
    this.gatewayId = oneData.id;
    this.gatewayForm.controls['Name'].setValue(oneData.name);
    this.gatewayForm.controls['SerialNumer'].setValue(oneData.serialNumer);
    this.gatewayForm.controls['IP4Address'].setValue(oneData.iP4Address);
  };

UpdateGateway(gateway: GatewayMap) {
  debugger;
  gateway.id = this.gatewayId;
  const product_Master = this.gatewayForm.value;
  this.gatewayService.updateGateway(product_Master).subscribe(() => {
    this.massage = 'Record Updated Successfully';
    this.getGatewayList();
  });

}
DeleteGateway(id: number) {
  if (confirm('Do you want to delete this gateway?')) {
    debugger;
    this.gatewayService.deleteGatewayById(id).subscribe(() => {
     this.getGatewayList();
    });
  }
}
}


