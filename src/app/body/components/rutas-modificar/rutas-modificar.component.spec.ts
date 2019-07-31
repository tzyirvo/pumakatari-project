/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { RutasModificarComponent } from "./rutas-modificar.component";

describe("RutasModificarComponent", () => {
  let component: RutasModificarComponent;
  let fixture: ComponentFixture<RutasModificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RutasModificarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutasModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
