export interface IInvoice {
  id: 'string';
  name: 'string';
  payerContact: 'string';
  status: 'string';
  totalPrice: 0;
}

export interface IInvoiceBody {
  customerId: number;
  startDate: string;
  endDate: string;
}

export interface ICalculateHoursBody {
  customerId: number;
  startDate: string;
  endDate: string;
}
