import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOutgoingTransactionComponent } from './add-outgoing-transaction.component';

describe('AddOutgoingTransactionComponent', () => {
  let component: AddOutgoingTransactionComponent;
  let fixture: ComponentFixture<AddOutgoingTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOutgoingTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOutgoingTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
