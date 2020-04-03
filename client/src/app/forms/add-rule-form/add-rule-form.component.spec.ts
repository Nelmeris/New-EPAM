import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRuleFormComponent } from './add-rule-form.component';

describe('AddRuleFormComponent', () => {
  let component: AddRuleFormComponent;
  let fixture: ComponentFixture<AddRuleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRuleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRuleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
