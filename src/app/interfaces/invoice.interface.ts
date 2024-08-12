export interface IInvoice {
  id: string;
  name: string;
  payerContact: string;
  status: string;
  totalPrice: 0;
}

export interface IInvoiceBody {
  start: string;
  end: string;
  projectId: number;
  employeeRate: any;
}

export interface ICalculateHoursBody {
  projectId: number;
  start: string;
  end: string;
}
