import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class AppStateService {
  nameHappening = '';
  isCreatingProcessFlag = false;
  showModal: EventEmitter<string> = new EventEmitter();

  constructor() {
  }

  setNameHappening(name: string) {
    this.nameHappening = name;
  }

  showModalityText(text: string) {
    this.showModal.emit(text)
  }

  hiddenModal() {
    this.showModal.emit(null)
  }

  setFlagIsCreatingProcessFlag(flag: boolean) {
    this.isCreatingProcessFlag = flag;
  }
}
