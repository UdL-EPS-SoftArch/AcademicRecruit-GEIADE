import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessStageCreateComponent } from './processStage-create.component';

describe('ProcessStageCreateComponent', () => {
  let component: ProcessStageCreateComponent;
  let fixture: ComponentFixture<ProcessStageCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessStageCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessStageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
