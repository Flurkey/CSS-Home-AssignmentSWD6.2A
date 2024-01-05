import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-add-drone',
  templateUrl: './add-drone.component.html',
  styleUrls: ['./add-drone.component.css']
})
export class AddDroneComponent implements OnInit {
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
  errorMessage: string = '';

  constructor(private registrationService: RegistrationService, private route: ActivatedRoute, private router: Router) {}
  token: string = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const storedToken = localStorage.getItem('authToken');
      if (!storedToken) {
        this.router.navigate(['/login-form']);
        return;
      }

      this.token = storedToken
    });
  }

  addDrone(): void {
    if (!this.serialNumber || !this.brandId || !this.modelId || !this.ownerIdCardNumber || !this.ownerFirstName || !this.ownerLastName || !this.ownerContactNumber || !this.ownerEmailAddress) {
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
      brandId: this.brandId,
      brandName: this.brandName,
      modelId: this.modelId,
      model: this.model,
      ownerIdCardNumber: this.ownerIdCardNumber,
      ownerFirstName: this.ownerFirstName,
      ownerLastName: this.ownerLastName,
      ownerContactNumber: this.ownerContactNumber,
      ownerEmailAddress: this.ownerEmailAddress
    };

    this.registrationService.addDrone(this.token, droneData).subscribe(
      (response: any) => {
        this.router.navigate(['/registration-list']);
      },
      (error: any) => {
        this.errorMessage = 'Failed to add drone. Please try again.';
      }
    );
  }
  
  resetForm(): void {
    this.serialNumber = '';
    this.brandId = 0;
    this.brandName = '';
    this.modelId = 0;
    this.model = '';
    this.ownerIdCardNumber = '';
    this.ownerFirstName = '';
    this.ownerLastName = '';
    this.ownerContactNumber = '';
    this.ownerEmailAddress = '';
    this.errorMessage = '';
  }
}
