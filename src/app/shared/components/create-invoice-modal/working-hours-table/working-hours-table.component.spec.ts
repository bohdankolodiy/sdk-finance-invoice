import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingHoursTableComponent } from './working-hours-table.component';

describe('WorkingHoursTableComponent', () => {
  let component: WorkingHoursTableComponent;
  let fixture: ComponentFixture<WorkingHoursTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkingHoursTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkingHoursTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
