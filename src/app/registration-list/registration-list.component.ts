import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { Owner } from '../dto/registration.dto';
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css']
})
export class RegistrationListComponent implements OnInit {
  constructor(private registrationService: RegistrationService, private route: ActivatedRoute, private router: Router) { }
  token: string = '';
  owners: Owner[] = [];
  admin: boolean = true;
  manager: boolean = true;
  ownersLoaded: boolean = false;
  fileName = 'ExcelSheet.xlsx';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const storedToken = localStorage.getItem('authToken');
      if (!storedToken) {
        this.router.navigate(['/login-form']);
        return;
      }

      this.token = storedToken
      this.initialiseRegistration();
    });
  }

  exportToPDF(): void {
    let originalElement = document.getElementById('drone-table');

    if (originalElement) {
      let elementCopy = originalElement.cloneNode(true) as HTMLElement;

      let buttons = elementCopy.querySelectorAll('button');
      buttons.forEach(button => button.remove());

      let headerCells = elementCopy.querySelectorAll('thead th');
      headerCells.forEach((cell, index) => {
          // Adjust the condition based on the columns you want to remove
          if (cell.textContent?.trim() === '' && index > 5 && index < 9) {
              cell.remove();
          }
      });
      
      // Remove rows with empty data cells for buttons
      let rows = elementCopy.querySelectorAll('tbody tr');
      rows.forEach(row => {
          let cells = row.querySelectorAll('td');
          cells.forEach((cell, index) => {
              // Adjust the condition based on the columns you want to remove
              if (cell.textContent?.trim() === '' && index > 5 && index < 9) {
                  cell.remove();
              }
          });
      });

      const pdf = new jsPDF("l","px","a4");
      pdf.html(elementCopy, {
        callback: () => {
          pdf.save('exportedData.pdf');
        }
      });
      console.log(pdf)
    } else {
      console.error('Element with id "drone-table" not found.');
    }
  }

  exportToExcel(): void {
    let originalElement = document.getElementById('drone-table');

    if (originalElement) {
      let elementCopy = originalElement.cloneNode(true) as HTMLElement;

      let buttons = elementCopy.querySelectorAll('button');
      buttons.forEach(button => button.remove());

      let rows = elementCopy.querySelectorAll('tbody tr');

      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(elementCopy);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      rows.forEach((row: Element) => {
        let brandCell = row.querySelector('td:nth-child(4)');
        if (brandCell) {
          let brand = brandCell.textContent?.toLowerCase().trim();
          let bgColor;
          switch (brand) {
            case 'syma':
              bgColor = '#000000';
              break;
            case 'dji':
              bgColor = '#000000';
              break;
            case 'freefly':
              bgColor = '#000000';
              break;
            default:
              bgColor = '#FFFFFF';
              break;
          }

          let htmlRow = row as HTMLTableRowElement;

          for (let i = 0; i < htmlRow.cells.length; i++) {
            let cellRef = XLSX.utils.encode_cell({ r: htmlRow.rowIndex - 1, c: i });
            ws[cellRef].t = 's';
            ws[cellRef].s = {
              fill: { patternType: "solid", bgColor: { rgb: bgColor } },
            };
          }
        }
      });

      console.log(ws);
      XLSX.writeFile(wb, this.fileName);
    } else {
      console.error('Element with id "drone-table" not found.');
    }
  }

  delete(id: number): void {
    if (!this.admin) {
      this.registrationService.deleteByID(this.token, id).subscribe((res: any) => {
        if (res == null) {
          const index = this.owners.findIndex(owner => owner.id === id);
          if (index !== -1) {
            this.owners.splice(index, 1);
          }
        }
      });
    }
  }

  view(id: number): void {
    this.router.navigate(['/view-drone', id]);
  }

  update(id: number): void {
    this.router.navigate(['/update-drone', id]);
  }

  initialiseRegistration(): void {
    this.registrationService.getOwners(this.token).subscribe((res: Owner[]) => {
      this.owners = res;
      this.ownersLoaded = true;

      // Check if user is an admin, if so enable the delete button else don't
      const id = Math.max(...this.owners.map(owner => owner.id), 0) + 1;
      this.registrationService.deleteByID(this.token, id).subscribe((res: any) => {
        if (res == null) {
          this.admin = false;
        }
      })

      this.registrationService.getDroneByID(this.token, this.owners[0].id).subscribe((res: any) => {
        const droneData = {
          serialNumber: res.serialNumber,
          modelId: res.modelId,
          ownerIdCardNumber: res.ownerIdCardNumber,
          ownerFirstName: res.ownerFirstName,
          ownerLastName: res.ownerLastName,
          ownerContactNumber: res.ownerContactNumber,
          ownerEmailAddress: res.ownerEmailAddress
        };

        this.registrationService.updateDrone(this.token, this.owners[0].id, droneData).subscribe(
          (response: any) => {
            this.manager = false;
          }
        );
      })
    })
  }
}
