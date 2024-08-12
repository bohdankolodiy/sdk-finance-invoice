export interface IWorkingHours {
  billableHours: 'string';
  client: 'string';
  countHours: 'string';
  employeeDepartment: 'string';
  employeeFullName: {
    id: 0;
    name: 'string';
  };
  notBillableHours: 'string';
  projectNameAndId: {
    id: 0;
    name: 'string';
  };
  taskNameAndId: {
    id: 0;
    name: 'string';
  };
}

export interface IEmployeeRate {
  id: number;
  rate: number;
  taskId: number;
}
