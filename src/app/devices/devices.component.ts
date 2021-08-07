import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { DeviceServiceService } from '../device-service.service';
import { DeviceMap as Device, DeviceMap} from '../Devices';
import { GatewayServiceService } from '../gateway-service.service';
import { GatewaysFillData } from '../Gateways';


@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  DevicesList :Observable<Device[]>;
  DevicesList1:Observable<Device[]>;
  ll:Device[];
  devicess:any=[];
  deviceForm: any;
  massage = "";
  deviceId :number;
  Users:[];
  products:any=[];
  li:any;
  lis:Device[];
  gatewaysResponse:any;
  gateways:GatewaysFillData[];
  g:Device;
  selectedGateway:string='';
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private formbulider: FormBuilder, 
    private httpClient: HttpClient, private deviceService: DeviceServiceService,
    private gatewayServices:GatewayServiceService) { 
    }
  ngOnInit(): void {
    this.deviceForm = this.formbulider.group({
      uid: ['', [Validators.required]],
      vendor: ['', [Validators.required]],
      status:[false, [Validators.required]],
      gatewayId:['', [Validators.required]]
  });
  this.getDeviceList();
  this.selectGateways();
  }
  selectChangeHandler (event: any) {
    //update the ui
    this.selectedGateway = event.target.value;
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
  getDeviceList() {
    this.deviceService.getDeviceList().subscribe(Response => {
      this.li=Response;
      this.lis=this.li;
    });
  }
  selectGateways(){
    this.gatewayServices.getGatewayList().subscribe(Response => {
      this.gatewaysResponse=Response;
      this.gateways=this.gatewaysResponse;
    });
  }
  PostDevice(device: DeviceMap) {
    debugger;
    const device_Master = this.deviceForm.value;
    device_Master.createdDate=new Date();
    if(device_Master.status==null || device_Master.status==undefined)
    {
      device_Master.status=false;
    }
    if(device_Master.gatewayId==null || device_Master.gatewayId==undefined)
    {
      alert("Please choose valid gateway!")
      return;
    }
    this.deviceService.postDeviceData(device_Master).subscribe(
      () => {
        this.massage = 'Data Saved Successfully';
       this.getDeviceList();
      }
    );
  
  }
  DeviceDetailsToEdit(id:number) {
   const oneData=  this.lis.find(t=>t.id==id) as DeviceMap;
      this.deviceId = oneData.id;
      this.deviceForm.controls['uid'].setValue(oneData.uid);
      this.deviceForm.controls['vendor'].setValue(oneData.vendor);
      this.deviceForm.controls['status'].setValue(oneData.status);
      this.deviceForm.controls['gatewayId'].setValue(oneData.gatewayId);
    };
  
  UpdateDevice(device: DeviceMap) {
    device.id = this.deviceId;
    const device_Master = this.deviceForm.value;
    if(device_Master.status==null || device_Master.status==undefined)
    {
      device_Master.status=false;
    }
    if(device_Master.gatewayId==null || device_Master.gatewayId==undefined)
    {
      alert("Please choose valid gateway!")
      return;
    }
    this.deviceService.updateDevice(device_Master).subscribe(() => {
      this.massage = 'Record Updated Successfully';
      this.getDeviceList();
    });
  
  }
  DeleteDevice(id: number) {
    if (confirm('Do you want to delete this device?')) {
      this.deviceService.deleteDeviceById(id).subscribe(() => {
       this.getDeviceList();
      });
    }
  }  
}
