import { ValidatorFn } from '@angular/forms';

export interface UITableHeader {
  key: string;
  index: number;
  type?: columnTypes;
  icons?: additionalIcons;
  clickable?: boolean;
  notVisible?: boolean;
  isMultiDropdown?: boolean;
  isEditable?: boolean;
  dynamicColumn?: boolean;
  displayedName?: string;
}

export interface UIDynamicTable {
  headers: UITableHeader[];
  data: any[];
  total?: any;
}

export enum columnTypes {
  dropDown,
  datePicker,
  checkBox,
  editable,
  link,
  topics,
  dateUTC,
  valueDisplay,
  topicTable,
  topicComment,
}

export enum additionalIcons {
  addDocument,
  addReport,
}

export interface ITableValidation {
  controlName: string;
  validators: ValidatorFn[];
}

export enum ProfessionalTableType {
  Certifications = 'certificates',
  AssignedMentors = 'assignedMentors',
  TechInterview = 'intervieweeInterviews',
  EnglishCourses = 'English courses',
  Conference = 'Conferences',
  InternalCourses = 'Internal courses',
  Presentation = 'Presentation',
  Training = 'Training',
}

export interface ITableRowAction {
  index: number;
  action: string;
  additionalIndex?: number;
}

export interface ITableOnClickCell {
  id: number;
  selectedValue: string;
  action: string;
  data?: any;
}
