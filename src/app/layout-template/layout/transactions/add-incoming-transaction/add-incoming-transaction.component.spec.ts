import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIncomingTransactionComponent } from './add-incoming-transaction.component';

describe('AddIncomingTransactionComponent', () => {
  let component: AddIncomingTransactionComponent;
  let fixture: ComponentFixture<AddIncomingTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddIncomingTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIncomingTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
