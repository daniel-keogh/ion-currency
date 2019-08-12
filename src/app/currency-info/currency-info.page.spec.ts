import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyInfoPage } from './currency-info.page';

describe('CurrencyInfoPage', () => {
  let component: CurrencyInfoPage;
  let fixture: ComponentFixture<CurrencyInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
