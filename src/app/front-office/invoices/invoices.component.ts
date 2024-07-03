import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UITableHeader } from '../../shared/components/table/table.models';
import { IInvoice } from '../../interfaces/invoice.interface';
import { TableComponent } from '../../shared/components/table/table.component';
import { InvoicesService } from '../../services/invoices.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateInvoiceModalComponent } from '../../shared/components/create-invoice-modal/create-invoice-modal.component';
import { filter, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  constructor(
    private invoicesService: InvoicesService,
    public dialog: MatDialog,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.getInvoices();
  }

  getInvoices() {
    this.invoicesService
      .getInvoices()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.dataCert = res;
      });
  }

  openCreateInvoiceModal() {
    this.dialog
      .open(CreateInvoiceModalComponent, {
        width: '250px',
        disableClose: true,
      })
      .afterClosed()
      .pipe(
        filter((res) => res),
        takeUntilDestroyed(this.destroyRef),
        switchMap((res) => this.invoicesService.createInvoices(res))
      )
      .subscribe(() => this.getInvoices());
  }
}
