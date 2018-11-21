import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidation {
  static checkArrayLimit(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): {[key: string]: any} => {
      if (c.value.length >= min && c.value.length < max)
        return null;

      return { 'checkArrayLimit': {valid: false }};
    }
  }

  static minLengthArray(min: number) {
    return (c: AbstractControl): {[key: string]: any} => {
      if (c.value.length >= min)
        return null;

      return { 'minLengthArray': {valid: false }};
    }
  }

  static maxLengthArray(max: number) {
    return (c: AbstractControl): {[key: string]: any} => {
      if (c.value.length < max)
        return null;

      return { 'minLengthArray': {valid: false }};
    }
  }
}
