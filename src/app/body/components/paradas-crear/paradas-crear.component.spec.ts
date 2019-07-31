/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { ParadasCrearComponent } from "./paradas-crear.component";

describe("ParadasCrearComponent", () => {
  let component: ParadasCrearComponent;
  let fixture: ComponentFixture<ParadasCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParadasCrearComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParadasCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
