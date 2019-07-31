/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { RutasEliminarComponent } from "./rutas-eliminar.component";

describe("RutasEliminarComponent", () => {
  let component: RutasEliminarComponent;
  let fixture: ComponentFixture<RutasEliminarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RutasEliminarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutasEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
