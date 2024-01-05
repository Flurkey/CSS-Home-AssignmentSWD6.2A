import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-update-drone',
  templateUrl: './update-drone.component.html',
  styleUrls: ['./update-drone.component.css']
})
export class UpdateDroneComponent  implements OnInit {
  serialNumber: string = '';
  modelId: number = 0;
  ownerIdCardNumber: string = '';
  ownerFirstName: string = '';
  ownerLastName: string = '';
  ownerContactNumber: string = '';
  ownerEmailAddress: string = '';
  errorMessage: string = '';

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
            this.serialNumber = droneDetails.serialNumber;
            this.modelId = droneDetails.modelId;
            this.ownerIdCardNumber = droneDetails.ownerIdCardNumber;
            this.ownerFirstName = droneDetails.ownerFirstName;
            this.ownerLastName = droneDetails.ownerLastName;
            this.ownerContactNumber = droneDetails.ownerContactNumber;
            this.ownerEmailAddress = droneDetails.ownerEmailAddress;
          
            const droneData = {
              serialNumber: droneDetails.serialNumber,
              modelId: droneDetails.modelId,
              ownerIdCardNumber: droneDetails.ownerIdCardNumber,
              ownerFirstName: droneDetails.ownerFirstName,
              ownerLastName: droneDetails.ownerLastName,
              ownerContactNumber: droneDetails.ownerContactNumber,
              ownerEmailAddress: droneDetails.ownerEmailAddress
            };
    
            this.registrationService.updateDrone(this.token, this.droneId, droneData).subscribe(
              (response: any) => {
                return
              },
              (error: any) => {
                console.error('Failed to update drone. Please try again.', error);
            
                this.router.navigate(['/registration-list']);
              }
            );
        },
        (error: any) => {
          this.errorMessage = 'Failed to fetch drone details.';
        }
      );
    });
  }

  updateDrone(): void {
    if (!this.serialNumber || !this.modelId || !this.ownerIdCardNumber || !this.ownerFirstName || !this.ownerLastName || !this.ownerContactNumber || !this.ownerEmailAddress) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    const contactNumberRegex = /^[0-9]+$/;
    if (!contactNumberRegex.test(this.ownerContactNumber) || this.ownerContactNumber.length < 8) {
      return;
    }

    const idCardNumberRegex = /^[0-9]+[a-zA-Z]$/;
    if (!idCardNumberRegex.test(this.ownerIdCardNumber)) {
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.ownerEmailAddress)) {
      return;
    }

    const droneData = {
      serialNumber: this.serialNumber,
      modelId: this.modelId,
      ownerIdCardNumber: this.ownerIdCardNumber,
      ownerFirstName: this.ownerFirstName,
      ownerLastName: this.ownerLastName,
      ownerContactNumber: this.ownerContactNumber,
      ownerEmailAddress: this.ownerEmailAddress
    };

    this.registrationService.updateDrone(this.token, this.droneId, droneData).subscribe(
      (response: any) => {
        console.log("Update Drone");
      },
      (error: any) => {
        this.errorMessage = 'Failed to update drone. Please try again.';
      }
    );
  }
  
  resetForm(): void {
    this.serialNumber = '';
    this.modelId = 0;
    this.ownerIdCardNumber = '';
    this.ownerFirstName = '';
    this.ownerLastName = '';
    this.ownerContactNumber = '';
    this.ownerEmailAddress = '';
    this.errorMessage = '';
  }
}
