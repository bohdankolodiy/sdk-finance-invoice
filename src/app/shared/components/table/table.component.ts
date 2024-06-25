import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import {
  ITableOnClickCell,
  UIDynamicTable,
  UITableHeader,
} from './table.models';
import { TypeofPipe } from '../../../pipes/typeof.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, TypeofPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit, OnChanges {
  @Input() tableType = '';
  @Input() headers!: UITableHeader[];
  @Input() set content(value: any[]) {
    this.contentArray = value;
  }
  @Input() isSortTable = true;
  @Output() onClickCell = new EventEmitter<ITableOnClickCell>();

  public tableData!: UIDynamicTable;
  public columnChecked!: UITableHeader; // which column is clicked
  public type!: string; // type of the sort - increment or decrement
  public contentArray!: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.tableData = { headers: [], data: [], total: {} };
    this.render();
  }

  ngOnChanges(): void {
    this.render();
  }

  render() {
    this.tableData = {
      headers: this.headers.filter(
        (element: UITableHeader) => !element.notVisible
      ),
      data: this.contentArray,
      total: {},
    };

    this.cdr.detectChanges();
  }

  sortData(event: any, column: UITableHeader) {
    if (this.isSortTable) {
      this.columnChecked = column;
      const target = event.target.innerText;
      if (this.columnChecked.key == '') {
        this.type = 'INC';
      }
      if (target == target && this.type == 'INC') {
        this.type = 'DEC';
      } else {
        this.type = 'INC';
      }
    }
  }

  /**
   * Method click name on table
   * @param id
   * @param selectedValue
   * @param action
   */
  onClickTableCell(
    event: Event,
    id: number,
    selectedValue: string,
    action: string,
    data?: any
  ) {
    event.stopPropagation();
    this.onClickCell.emit({ id, selectedValue, action, data });
  }
}
