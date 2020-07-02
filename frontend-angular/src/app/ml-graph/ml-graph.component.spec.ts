import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlGraphComponent } from './ml-graph.component';

describe('MlGraphComponent', () => {
  let component: MlGraphComponent;
  let fixture: ComponentFixture<MlGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
