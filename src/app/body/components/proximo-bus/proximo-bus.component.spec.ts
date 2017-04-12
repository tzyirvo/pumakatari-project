/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProximoBusComponent } from './proximo-bus.component';

describe('ProximoBusComponent', () => {
  let component: ProximoBusComponent;
  let fixture: ComponentFixture<ProximoBusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProximoBusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProximoBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
