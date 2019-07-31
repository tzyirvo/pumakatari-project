/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { ParadaMasCercanaComponent } from "./parada-mas-cercana.component";

describe("ParadaMasCercanaComponent", () => {
  let component: ParadaMasCercanaComponent;
  let fixture: ComponentFixture<ParadaMasCercanaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParadaMasCercanaComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParadaMasCercanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
