import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UITableHeader } from '../../shared/components/table/table.models';
import { IInvoice } from '../../interfaces/invoice.interface';
import { TableComponent } from '../../shared/components/table/table.component';
import { InvoicesService } from '../../services/invoices.service';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss',
})
export class InvoicesComponent implements OnInit {
  @ViewChild('tableWrapper') tableWrapper!: ElementRef;

  public headersCert: UITableHeader[] = [
    { key: 'id', index: 0, displayedName: 'ID' },
    { key: 'name', index: 1, displayedName: 'Name' },
    { key: 'payerContact', index: 2, displayedName: 'Payer Contact' },
    { key: 'status', index: 3, displayedName: 'Status' },
    { key: 'totalPrice', index: 4, displayedName: 'Total Price' },
  ];

  public dataCert: IInvoice[] = []; // data about employees with all fields(columns)

  constructor(private invoicesService: InvoicesService) {}

  ngOnInit(): void {
    this.getInvoices();
  }

  getInvoices() {
    this.invoicesService.getInvoices().subscribe((res) => {
      this.dataCert = [
        {
          id: 'string',
          name: 'string',
          payerContact: 'string',
          status: 'string',
          totalPrice: 0,
        },
      ];
    });
  }
}
