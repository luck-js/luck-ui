import { Injectable } from '@angular/core';

@Injectable()
export class AppStateService {
  public nameHappening = '';

  constructor() {
  }

  setNameHappening(name: string) {
    this.nameHappening = name;
  }

}
