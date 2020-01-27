import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Column2dComponent } from './column2d.component';

describe('Column2dComponent', () => {
  let component: Column2dComponent;
  let fixture: ComponentFixture<Column2dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Column2dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Column2dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
