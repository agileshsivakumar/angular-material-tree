import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularMaterialTreeComponent } from './angular-material-tree.component';

describe('AngularMaterialTreeComponent', () => {
  let component: AngularMaterialTreeComponent;
  let fixture: ComponentFixture<AngularMaterialTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AngularMaterialTreeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularMaterialTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
