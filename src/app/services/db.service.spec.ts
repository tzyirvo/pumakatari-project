/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from "@angular/core/testing";
import { DbServiceService } from "./db.service.ts";

describe("DbServiceService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DbServiceService]
    });
  });

  it("should ...", inject([DbServiceService], (service: DbServiceService) => {
    expect(service).toBeTruthy();
  }));
});
