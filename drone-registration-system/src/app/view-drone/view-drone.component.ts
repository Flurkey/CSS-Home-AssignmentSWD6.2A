import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-view-drone',
  templateUrl: './view-drone.component.html',
  styleUrls: ['./view-drone.component.css']
})
export class ViewDroneComponent implements OnInit {
  id: number = 0;
  serialNumber: string = '';
  brandId: number = 0;
  brandName: string = '';
  modelId: number = 0;
  model: string = '';
  ownerIdCardNumber: string = '';
  ownerFirstName: string = '';
  ownerLastName: string = '';
  ownerContactNumber: string = '';
  ownerEmailAddress: string = '';

  constructor(private registrationService: RegistrationService, private route: ActivatedRoute, private router: Router) {}
  token: string = '';
  droneId: number = 0;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.droneId = this.route.snapshot.params['id'];

      const storedToken = localStorage.getItem('authToken');
      if (!storedToken) {
        this.router.navigate(['/login-form']);
        return;
      }

      this.token = storedToken

      this.registrationService.getDroneByID(this.token, this.droneId).subscribe(
        (droneDetails: any) => {
          this.id = droneDetails.id;
          this.serialNumber = droneDetails.serialNumber;
          this.brandId = droneDetails.brandId;
          this.brandName = droneDetails.brandName;
          this.modelId = droneDetails.modelId;
          this.model = droneDetails.model;
          this.ownerIdCardNumber = droneDetails.ownerIdCardNumber;
          this.ownerFirstName = droneDetails.ownerFirstName;
          this.ownerLastName = droneDetails.ownerLastName;
          this.ownerContactNumber = droneDetails.ownerContactNumber;
          this.ownerEmailAddress = droneDetails.ownerEmailAddress;

          const droneData = {
            id: this.id,
            serialNumber: this.serialNumber,
            brandId: this.brandId,
            brandName: this.brandName,
            modelId: this.modelId,
            modelName: this.model,
            ownerIdCardNumber: this.ownerIdCardNumber,
            ownerFirstName: this.ownerFirstName,
            ownerLastName: this.ownerLastName,
            ownerContactNumber: this.ownerContactNumber,
            ownerEmailAddress: this.ownerEmailAddress
          };
      })
    })
  }
}
