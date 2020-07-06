import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserFormComponent } from './create-user-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreateUserFormComponent', () => {
  let component: CreateUserFormComponent;
  let fixture: ComponentFixture<CreateUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ CreateUserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
