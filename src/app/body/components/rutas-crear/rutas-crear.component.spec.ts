/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RutasCrearComponent } from './rutas-crear.component';

describe('RutasCrearComponent', () => {
  let component: RutasCrearComponent;
  let fixture: ComponentFixture<RutasCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutasCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutasCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
