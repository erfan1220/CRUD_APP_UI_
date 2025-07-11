import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceInfoComponent } from './advance-info.component';

describe('AdvanceInfoComponent', () => {
  let component: AdvanceInfoComponent;
  let fixture: ComponentFixture<AdvanceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvanceInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvanceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
