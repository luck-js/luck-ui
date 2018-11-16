import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class AppStateService {
  nameHappening = '';
  showModal: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }

  setNameHappening(name: string) {
    this.nameHappening = name;
  }

  setModalVisibility() {
    this.showModal.emit(true)
  }

  hiddenModal() {
    this.showModal.emit(false)
  }

}
