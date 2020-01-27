import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mscolumn2dComponent } from './mscolumn2d.component';

describe('Mscolumn2dComponent', () => {
  let component: Mscolumn2dComponent;
  let fixture: ComponentFixture<Mscolumn2dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mscolumn2dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mscolumn2dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
